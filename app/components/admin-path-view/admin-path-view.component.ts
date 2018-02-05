import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Path } from '../../datatypes/path';
import { PathStep } from '../../datatypes/pathstep';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-path-view',
  templateUrl: './admin-path-view.component.html',
  styleUrls: ['./admin-path-view.component.css'],
})
export class AdminPathViewComponent implements OnInit {

  path: Path = new Path();
  pathSteps: PathStep[] = [];

  headerConfiguration = new UiAdminHeaderConfiguration({ subheaderText: 'ścieżka obiegu dokumentów'});

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(
      this.backendApiService.getPathStepsObservable().subscribe( pathSteps => {
        this.pathSteps = pathSteps;
      })
    );


    this.subscriptionManager.add(

      this.currentRoute.params.subscribe(params => {
        this.backendApiService.getPath(+params['pathId'])
          .then(path => {
            this.path = path;
            this.headerConfiguration.headerText = this.path.name;
            this.backendApiService.refreshPathStepsObservable(path.id);
        });
      })

    );

  }


  addFirstPathStep() {

    const newPathStep = new PathStep();
    newPathStep.path_id = this.path.id;
    newPathStep.step_order = 1;
    newPathStep.name = 'Wprowadzanie dokumentu';
    newPathStep.action_enter = 'TRUE';
    this.backendApiService.createPathStep(newPathStep).then(p => {
      this.backendApiService.refreshPathStepsObservable(this.path.id);
    });

  }

  toggleActionNext(pathStep: PathStep) {
    if (pathStep.action_next === 'TRUE') { pathStep.action_next = 'FALSE'; } else { pathStep.action_next = 'TRUE'; }
    this.backendApiService.updatePathStep(pathStep);
  }

  toggleActionArchive(pathStep: PathStep) {
    if (pathStep.action_archive === 'TRUE') { pathStep.action_archive = 'FALSE'; } else { pathStep.action_archive = 'TRUE'; }
    this.backendApiService.updatePathStep(pathStep);
  }

  toggleActionCancel(pathStep: PathStep) {
    if (pathStep.action_cancel === 'TRUE') { pathStep.action_cancel = 'FALSE'; } else { pathStep.action_cancel = 'TRUE'; }
    this.backendApiService.updatePathStep(pathStep);
  }

  toggleActionChange(pathStep: PathStep) {
    if (pathStep.action_change === 'TRUE') { pathStep.action_change = 'FALSE'; } else { pathStep.action_change = 'TRUE'; }
    this.backendApiService.updatePathStep(pathStep);
  }

  pathstepCanGoUp(pathStep: PathStep) {
    let previousStepOrder = 0;
    for (let i = 0; i < this.pathSteps.length; i ++) {
      if (this.pathSteps[i].step_order > previousStepOrder && this.pathSteps[i].step_order < pathStep.step_order) {
        previousStepOrder = this.pathSteps[i].step_order;
      }
    }

    if (previousStepOrder > 1) { return true; } else { return false; }
  }

  pathstepCanGoDown(pathStep: PathStep) {
    let nextStepOrder = pathStep.step_order;
    for (let i = 0; i < this.pathSteps.length; i++) {
      if (this.pathSteps[i].step_order > nextStepOrder) {
        nextStepOrder = this.pathSteps[i].step_order;
      }
    }

    if (nextStepOrder > pathStep.step_order) { return true; } else { return false; }
  }


  pathstepGoUp(pathStep: PathStep) {
    if (!this.pathstepCanGoUp(pathStep)) { return; }

    let previousPathStep = null;
    let previousStepOrder = 0;

    for (let i = 0; i < this.pathSteps.length; i ++) {
      if (this.pathSteps[i].step_order > previousStepOrder && this.pathSteps[i].step_order < pathStep.step_order) {
        previousStepOrder = this.pathSteps[i].step_order;
        previousPathStep = this.pathSteps[i];
      }
    }

    if (previousPathStep !== null) {
      const tmp = previousPathStep.step_order;
      previousPathStep.step_order = pathStep.step_order;
      pathStep.step_order = tmp;

      this.backendApiService.updatePathStep(pathStep)
        .then(resp => this.backendApiService.updatePathStep(previousPathStep))
        .then(resp => this.backendApiService.refreshPathStepsObservable(this.path.id));
    }

  }

  pathstepGoDown(pathStep: PathStep) {
    if (!this.pathstepCanGoDown(pathStep)) { return; }

    let nextStepOrder = pathStep.step_order;
    let nextPathStep = null;

    for (let i = 0; i < this.pathSteps.length; i++) {
      if (this.pathSteps[i].step_order > nextStepOrder && nextStepOrder === pathStep.step_order) {
        nextStepOrder = this.pathSteps[i].step_order;
        nextPathStep = this.pathSteps[i];
      }
    }

    if (nextPathStep !== null) {
      const tmp = nextPathStep.step_order;
      nextPathStep.step_order = pathStep.step_order;
      pathStep.step_order = tmp;

      this.backendApiService.updatePathStep(pathStep)
        .then(resp => this.backendApiService.updatePathStep(nextPathStep))
        .then(resp => this.backendApiService.refreshPathStepsObservable(this.path.id));
    }
  }

  pathstepHasActions(pathStep: PathStep): boolean {
    return (
      pathStep.action_next === 'TRUE' ||
      pathStep.action_archive === 'TRUE' ||
      pathStep.action_cancel === 'TRUE' ||
      pathStep.action_change === 'TRUE');
  }
}
