import * as cluster from 'node:cluster';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IClusterConfig } from 'src/env-config/clusterConfig';

const clusterManager: cluster.Cluster = cluster as any;

@Injectable()
export class AppClusterService {
  constructor(private configService: ConfigService) {}

  public config = this.configService.get<IClusterConfig>('cluster');

  public clusterize(bootstrapFn: () => void): void {
    const useClustering = this.config.enable_clustering;
    if (useClustering && clusterManager.isPrimary) {
      this.startInWorker();
    } else {
      this.startInMain(bootstrapFn);
    }
  }

  public startInMain(bootstrapFn: () => void) {
    return bootstrapFn();
  }

  public startInWorker() {
    for (let i = 1; i <= this.config.max_workers; i++) {
      clusterManager.fork();
    }

    clusterManager.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died. Restarting`);
      clusterManager.fork();
    });
  }
}
