import fs from 'fs';
import path from 'path';

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
  } catch (error) {
    console.error('Error extracting icon IDs:', error);
    return [];
  }
}

export function generateIconIdType(): string {
  const ids = extractIconIds();

  if (ids.length === 0) {
    return 'export type IconId = never;';
  }

  const typeDefinition = `export type IconId =\n  | '${ids.join("'\n  | '")}';`;

  return typeDefinition;
}

function updateIconTsxFile() {
  try {
    const iconTsxPath = path.join(
      process.cwd(),
      'src/shared/components/icon/Icon.tsx'
    );
    const iconTsxContent = fs.readFileSync(iconTsxPath, 'utf-8');

    const typeDefinition = generateIconIdType();

    // IconId 타입 정의를 찾아서 교체
    const typeRegex = /export type IconId =[\s\S]*?;/;
    const updatedContent = iconTsxContent.replace(typeRegex, typeDefinition);

    fs.writeFileSync(iconTsxPath, updatedContent, 'utf-8');
    console.log('✅ Icon.tsx 파일이 자동으로 업데이트되었습니다!');
    console.log('📋 업데이트된 타입 정의:');
    console.log(typeDefinition);
  } catch (error) {
    console.error('❌ Icon.tsx 파일 업데이트 중 오류 발생:', error);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  updateIconTsxFile();
}
