import { entries, isString } from 'lodash';
import queryString from 'query-string';
import { splitByComma } from '@lofty87/util';
import env from '@env';

const { isDev, imagesUrl } = env;

/**
 * @name convertGoogleDriveImageShareLink
 * @param 'https://drive.google.com/file/d/{id}/view?usp=sharing'
 * @returns 'http://drive.google.com/uc?export=view&id={id}'
 * * Google Drive 를 이미지 서버로 사용하기 위한 방법
 *
 * * Google Drive 에서 지원하는 공유 링크를 통해
 * * 순수 이미지만 볼 수 있는 url 로 변경
 *
 * ? 공유 링크 판별
 * ? 1. url 마지막 subpathname 이 'view' 로 끝남
 * ? 2. query param 으로 'usp' 를 가지고 있음
 * ? 3. 공유 링크가 아닌 경우 그대로 리턴
 *
 * TODO: 정규식을 사용해서 간단하게 작성 가능
 */
const visibleGoogleDriveImageUrl = 'http://drive.google.com/uc?export=view&id=';

export const convertGoogleDriveImageShareLink = (googleDriveImageShareLink: string) => {
  const parsedLink = queryString.parseUrl(googleDriveImageShareLink);
  const splittedUrl = parsedLink.url.split('/');

  const { usp: hasUsp } = parsedLink.query;
  const viewIndex = splittedUrl.findIndex((value) => value === 'view');
  const hasView = viewIndex > -1;

  if(!hasUsp || !hasView) {
    console.warn(`incorrect google drive image share link: ${googleDriveImageShareLink}`);

    return googleDriveImageShareLink;
  }

  const id = splittedUrl[viewIndex - 1];

  return `${visibleGoogleDriveImageUrl}${id}`;
};

/**
 * @name mappingImage
 * * local image 와 Google Drive image 를 매핑할 때
 * * 가독성을 높이기 위해 작성
 */
export const mappingImage = (localImageFilename: string, googleDriveImageShareLink: string) => {
  return `${localImageFilename},${googleDriveImageShareLink}`;
};

/**
 * @name normalizeImages
 * * 매핑된 local image 와 Google Drive image 들을
 * * 실행 환경에 따라 알맞게 보여줄 수 있도록 normalize 해주는 함수
 * * development: local image
 * * production: Google Drive image
 *
 * ! images 는 plain object 이며
 * ! key 값은 image path 의 depth 이다.
 *
 * ? e.g. 'common/brand/title_logo.png'
 * ? images = normalizeImages({
 * ?   common: {
 * ?     brand: {
 * ?       titleLogo: mappingImage('title_logo.png', 'google drive image share link')
 * ?     }
 * ?   }
 * ? })
 */
type Images = {
  [key: string]: string | Images;
};

export const normalizeImages = <T extends Images>(images: T, path?: string) => {
  const keyAndValues = entries(images);

  return keyAndValues.reduce<Images>((result, [ key, value ]) => {
    path = path || imagesUrl;

    if(isString(value)) {
      const [ localImageFilename, googleDriveImageShareLink ] = splitByComma(value);

      result[key] = isDev ?
        `${path}/${localImageFilename}` :
        convertGoogleDriveImageShareLink(googleDriveImageShareLink);
    } else {
      result[key] = isDev ? normalizeImages(value, `${path}/${key}`) : normalizeImages(value);
    }

    return result;
  }, {}) as typeof images;
};
