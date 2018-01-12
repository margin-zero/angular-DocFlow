// UiAdminFormButtonConfiguration
// klasa definiuje typ danych dla konfiguracji komponentu: ui-admin-form-button
// klasa opisuje trzy przyciski: reset, cancel, submit, każdy z nich możemy w pewnym stopniu konfigurować
// *.value - jest to napis na odpowiednim przycisku
// cancel.goBack - określa, czy przycisk ma działać jako "idź wstecz"
// cancel.navigate - jeśli goBack === false, to przycisk bierze tą wartość jako parametr dla router.navigate
// cancel.isRelative - jeśli goBack === false, to isRelative określa, czy router.navigate przyjmie wartość relativeTo (aktualna ścieżka)
// submit.disabled - określa, czy przycisk submit ma być wyświetlany w stanie "disabled"

export class UiAdminFormButtonConfiguration {
    reset: { value: string };
    cancel: { value: string, goBack: true, navigate: string, isRelative: boolean };
    submit: { value: string, disabled: boolean};

}


export function UiAdminFormButtonConfigurationFactory(): UiAdminFormButtonConfiguration {
    return ({
        reset: { value: 'resetuj'},
        cancel: { value: 'anuluj', goBack: true, navigate: null, isRelative: false},
        submit: { value: 'zatwierdź', disabled: true}
    });
}
