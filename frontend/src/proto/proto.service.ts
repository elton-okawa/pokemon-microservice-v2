import { Service } from "typedi";
import { loadPackageDefinition, GrpcObject } from 'grpc';
import { loadSync } from '@grpc/proto-loader';

@Service()
export class ProtoService {
  
  getProtoDescriptor(path: string): GrpcObject {
    const packageDefinition = loadSync(
      path,
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      });
      
    return loadPackageDefinition(packageDefinition);
  }
}