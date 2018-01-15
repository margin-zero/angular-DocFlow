// UiAdminFormButtonConfiguration class
// -------------------------------------
// Class defines datatype for ui-admin-form-button component's configuration.
// Class describes properties of three buttons: 'reset', 'cancel' and 'submit' each of them can be configured.
// *.value - is value of 'value' property of each button
// cancel.goBack, cancel.navigate and cancel.isRelative describe 'cancel' button behavior.
// cancel.goBack === true means that 'cancel' button is just 'go back' button, if cancel.goBack is set to 'true'
// then cancel.navigate and cancel.isRelative are irrelevant.
// if cancel.goBack is set to 'false' then cancel.navigate and cancel.isRelative are parameters for router
// describing routing after clicking 'cancel' button.
// cancel.navigate is path parameter for router.navigate
// cancel.isRelative set to 'true' means that cancel.navigate parameter will be set relative to current route
// submit.disabled is used for setting state of 'submit' button to 'disabled' (submit.disabled=true) or
// 'not disabled' (submit.disabled=false)
// reset.isVisible says if reset button is visible or not.

export class UiAdminFormButtonConfiguration {
    reset: { value: string, isVisible: boolean };
    cancel: { value: string, goBack: boolean, navigate: string, isRelative: boolean };
    submit: { value: string, disabled: boolean};

    constructor( params: any) {

        // first we set default values to every parameter
        this.reset = {
            value: 'resetuj',
            isVisible: true
        };
        this.cancel = {
            value: 'anuluj',
            goBack: true,
            navigate: null,
            isRelative: false
        };
        this.submit = {
            value: 'zatwierdź',
            disabled: true
        };

        // then we update parameters with sent values
        const paramArray = Object.keys(params);

        for ( let i = 0; i < paramArray.length; i++ ) {
            const subparamArray = Object.keys(params[paramArray[i]]);
            for ( let j = 0; j < subparamArray.length; j++ ) {
                this[paramArray[i]][subparamArray[j]] = params[paramArray[i]][subparamArray[j]];
            }
        }
    }
}



export class UiAdminHeaderConfiguration {
    headerText: string;
    subheaderText: string;

    constructor(params: any) {

        this.headerText = '';
        this.subheaderText = '';

        const paramArray = Object.keys(params);
        for ( let i = 0; i < paramArray.length; i++) {
            this[paramArray[i]] = params[paramArray[i]];
        }
    }
}
