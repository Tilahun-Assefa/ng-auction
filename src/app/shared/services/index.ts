import { Provider } from "@angular/core";
import { BidService } from "./bid.service";
import { HttpProductService, ProductService } from './product.service';
import { WebsocketService } from './websocket.service';

export { BidMessage, BidService } from './bid.service';
export { Product, ProductSearchParams, ProductService } from './product.service';
export { WebsocketService } from './websocket.service';

export const SHARED_SERVICES: Provider[] = [
    { provide: BidService, useClass: BidService },
    { provide: ProductService, useClass: HttpProductService },
    { provide: WebsocketService, useClass: WebsocketService }
];