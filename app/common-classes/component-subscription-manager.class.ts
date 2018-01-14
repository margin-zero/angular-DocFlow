import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class ComponentSubscriptionManager implements OnDestroy {
    private subscriptionArray = [];

    add(subscription: any) {
        this.subscriptionArray.push(subscription);
    }

    ngOnDestroy() {
        for (let i = 0; i < this.subscriptionArray.length; i++ ) {
            this.subscriptionArray[i].unsubscribe();
        }
    }

}
