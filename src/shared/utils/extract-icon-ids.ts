import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export function extractIconIds(): string[] {
  try {
    const svgPath = path.join(process.cwd(), 'src/assets/svg/ic_sprite.svg');
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    const idRegex = /<symbol[^>]*id="([^"]+)"/g;
    const ids: string[] = [];

    let match;
    while ((match = idRegex.exec(svgContent)) !== null) {
      ids.push(match[1]);
    }

    return ids.sort();
  } catch {
    return [];
  }
}

function updateIconTsxFile() {
  try {
    const iconTsxPath = path.join(
      process.cwd(),
      'src/shared/components/icon/Icon.tsx'
    );
    const iconTsxContent = fs.readFileSync(iconTsxPath, 'utf-8');

    const ids = extractIconIds();
    if (ids.length === 0) {
      console.error(
        '❌ 아이콘 ID를 찾지 못했습니다. Icon.tsx 업데이트를 건너뜁니다.'
      );
      return;
    }
    const typeDefinition = `export type IconId =\n  | '${ids.join("'\n  | '")}';`;
    const typeRegex = /export type IconId =[\s\S]*?;/;
    const updatedContent = iconTsxContent.replace(typeRegex, typeDefinition);
    if (updatedContent === iconTsxContent) {
      console.info('ℹ️ Icon.tsx에 변경 사항이 없습니다.');
      return;
    }
    fs.writeFileSync(iconTsxPath, updatedContent, 'utf-8');
    console.info('✅ Icon.tsx 파일이 자동으로 업데이트되었습니다!');
    console.info('📋 업데이트된 타입 정의:');
    console.info(typeDefinition);
  } catch (error) {
    console.error('❌ Icon.tsx 파일 업데이트 중 오류 발생:', error);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  updateIconTsxFile();
}
