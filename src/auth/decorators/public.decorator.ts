import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * # 设置为公共接口
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
