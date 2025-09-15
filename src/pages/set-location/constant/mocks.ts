export interface Region {
  name: string;
  id: string;
}

/** 검색 결과 더미 응답 */
export const getSearchedRegionsResponse = {
  results: [
    { id: '11215', name: '서울 광진구 전체' },
    { id: '11215101', name: '서울 광진구 화양동' },
    { id: '11215102', name: '서울 광진구 구의동' },
    { id: '11215103', name: '서울 광진구 구의1동' },
    { id: '11215104', name: '서울 광진구 군자동' },
    { id: '11215105', name: '서울 광진구 능동' },
    { id: '11215106', name: '서울 광진구 자양동' },
    { id: '11215107', name: '서울 광진구 중곡동' },
  ],
};

/** GET /regions?depth=1 depth=1 더미 응답 */
export const getRegionsDepth1 = {
  regions: [
    { name: '서울', id: '11' },
    { name: '부산', id: '26' },
    { name: '대구', id: '27' },
    { name: '인천', id: '28' },
    { name: '광주', id: '29' },
    { name: '대전', id: '30' },
    { name: '울산', id: '31' },
    { name: '세종', id: '36' },
    { name: '경기', id: '41' },
    { name: '강원', id: '42' },
    { name: '충북', id: '43' },
    { name: '충남', id: '44' },
    { name: '전북', id: '45' },
    { name: '전남', id: '46' },
    { name: '경북', id: '47' },
    { name: '경남', id: '48' },
    { name: '제주', id: '50' },
  ],
};

/** GET /regions?depth=2&parentId={id} parentId=11 (서울) 더미 응답 */
export const getRegionsDepth2_Parent11 = {
  parent: { name: '서울특별시', id: '11' },
  regions: [
    { name: '서울 전체', id: '11' },
    { name: '종로구', id: '11110' },
    { name: '중구', id: '11140' },
    { name: '용산구', id: '11170' },
    { name: '마포구', id: '11440' },
    { name: '서초구', id: '11650' },
    { name: '강남구', id: '11680' },
    { name: '송파구', id: '11710' },
    { name: '강동구', id: '11740' },
    { name: '노원구', id: '11350' },
    { name: '강서구', id: '11500' },
    { name: '용산구2', id: '111702' },
    { name: '마포구2', id: '114402' },
    { name: '서초구2', id: '116502' },
    { name: '강남구2', id: '116802' },
    { name: '송파구2', id: '117102' },
    { name: '강동구2', id: '117402' },
    { name: '노원구2', id: '113502' },
    { name: '강서구2', id: '115002' },
  ],
};

/** GET /regions?depth=3&parentId={id} parentId=11680 (서울 강남구) 더미 응답 */
export const getRegionsDepth3_Parent11680 = {
  parent: { name: '강남구', id: '11680' },
  regions: [
    { name: '강남구 전체', id: '11680' },
    { name: '신사동', id: '11680109' },
    { name: '논현동', id: '11680101' },
    { name: '압구정동', id: '11680108' },
    { name: '청담동', id: '11680104' },
    { name: '삼성동', id: '11680106' },
    { name: '역삼동', id: '11680105' },
    { name: '대치동', id: '11680107' },
    { name: '개포동', id: '11680103' },
    { name: '일원동', id: '11680112' },
    { name: '수서동', id: '11680115' },
    { name: '압구정동2', id: '116801082' },
    { name: '청담동2', id: '116801042' },
    { name: '삼성동2', id: '116801062' },
    { name: '역삼동2', id: '116801052' },
    { name: '대치동2', id: '116801072' },
    { name: '개포동2', id: '116801032' },
    { name: '일원동2', id: '116801122' },
    { name: '수서동2', id: '116801152' },
  ],
};
