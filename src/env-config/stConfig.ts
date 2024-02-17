import { registerAs } from '@nestjs/config';
import { join } from 'path';
const storageConfig = registerAs('filesystem', () => ({
  default: 'local',
  disks: {
    local: {
      driver: 'local',
      basePath: join(process.cwd(), 'storage', 'profilePictures'),
    },
  },
}));
export default storageConfig;
