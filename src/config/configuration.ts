import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { merge } from 'lodash';

const YAML_CONFIG_FILENAME = 'config.yaml';
const YAML_CONFIG_ENV = `config.${process.env.NODE_ENV || 'development'}.yaml`;

const filePath = yaml.load(
  readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
) as Record<string, any>;

const envPath = yaml.load(
  readFileSync(join(__dirname, YAML_CONFIG_ENV), 'utf8'),
) as Record<string, any>;

console.log('当前配置信息:', merge(filePath, envPath));
export default () => {
  return merge(filePath, envPath);
};
