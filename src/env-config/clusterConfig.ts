export const clusterConfig = () => ({
  cluster: {
    enable_clustering: process.env.ENABLE_CLUSTERS === 'true',
    max_workers: parseInt(process.env.MAX_WORKERS),
  } as IClusterConfig,
});

export interface IClusterConfig {
  enable_clustering: boolean;
  max_workers: number;
}
