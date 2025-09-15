// /mocks/db.ts

export interface Region {
  name: string;
  parentId?: string; // depth 2, 3인 경우 상위 지역 id
}

export const regionsDB: Record<string, Region> = {
  // Depth 1: 시/도
  '11': { name: '서울특별시' },
  '26': { name: '부산광역시' },
  '28': { name: '인천광역시' },
  '41': { name: '경기도' },
  '44': { name: '충청남도' },

  // Depth 2: 시/군/구
  '11680': { name: '강남구', parentId: '11' },
  '11710': { name: '송파구', parentId: '11' },
  '11440': { name: '마포구', parentId: '11' },

  '26440': { name: '해운대구', parentId: '26' },
  '26290': { name: '남구', parentId: '26' },

  '28200': { name: '남동구', parentId: '28' },

  '41135': { name: '성남시 분당구', parentId: '41' },
  '41281': { name: '고양시 덕양구', parentId: '41' },
  '41310': { name: '구리시', parentId: '41' },
  '41463': { name: '용인시 기흥구', parentId: '41' },

  '44200': { name: '아산시', parentId: '44' },
  '44131': { name: '천안시 동남구', parentId: '44' },

  // Depth 3: 읍/면/동
  '11680107': { name: '대치동', parentId: '11680' },
  '11680101': { name: '논현동', parentId: '11680' },
  '11680105': { name: '역삼동', parentId: '11680' },

  '11710101': { name: '잠실동', parentId: '11710' },
  '11710112': { name: '가락동', parentId: '11710' },

  '11440121': { name: '서교동', parentId: '11440' },
  '11440120': { name: '합정동', parentId: '11440' },

  '41135610': { name: '정자동', parentId: '41135' },
  '41135620': { name: '서현동', parentId: '41135' },

  '41463510': { name: '구갈동', parentId: '41463' },
  '41463560': { name: '상갈동', parentId: '41463' },
  '41463550': { name: '신갈동', parentId: '41463' },
};

// GET /regions?depth=1 depth=1 응답
export const getRegionsDepth1 = {
  regions: [
    { name: '서울특별시', id: '11' },
    { name: '부산광역시', id: '26' },
    { name: '인천광역시', id: '28' },
    { name: '경기도', id: '41' },
    { name: '충청남도', id: '44' },
  ],
};

// GET /regions?depth=2&parentId={id} parentId=11 (서울)
export const getRegionsDepth2_Parent11 = {
  parent: { name: '서울특별시', id: '11' },
  regions: [
    { name: '서울 전체', id: '11' },
    { name: '강남구', id: '11680' },
    { name: '송파구', id: '11710' },
    { name: '마포구', id: '11440' },
  ],
};

//  parentId=41 (경기)
export const getRegionsDepth2_Parent41 = {
  parent: { name: '경기도', id: '41' },
  regions: [
    { name: '경기 전체', id: '41' },
    { name: '성남시 분당구', id: '41135' },
    { name: '고양시 덕양구', id: '41281' },
    { name: '구리시', id: '41310' },
    { name: '용인시 기흥구', id: '41463' },
  ],
};

// GET /regions?depth=3&parentId={id} parentId=11680 (서울 강남구)
export const getRegionsDepth3_Parent11680 = {
  parent: { name: '강남구', id: '11680' },
  regions: [
    { name: '강남구 전체', id: '11680' },
    { name: '대치동', id: '11680107' },
    { name: '논현동', id: '11680101' },
    { name: '역삼동', id: '11680105' },
  ],
};

// parentId=41463 (경기 용인시 기흥구)
export const getRegionsDepth3_Parent41463 = {
  parent: { name: '용인시 기흥구', id: '41463' },
  regions: [
    { name: '용인시 기흥구 전체', id: '41463' },
    { name: '구갈동', id: '41463510' },
    { name: '상갈동', id: '41463560' },
    { name: '신갈동', id: '41463550' },
  ],
};
