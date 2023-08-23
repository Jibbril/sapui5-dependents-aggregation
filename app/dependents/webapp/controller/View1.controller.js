sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button",
    "sap/ui/model/json/JSONModel",
    "sap/m/VBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Dialog, Text, Button, JSONModel, VBox) {
        "use strict";

        return Controller.extend("ns.dependents.controller.View1", {
            onInit: function () {
                const model = this.getOwnerComponent().getModel();
                this.getView().setModel(model);
            },

            onButtonPressed: function (event) {
                const dialog = new Dialog({ 
                    title: "Hello World",
                    content: new VBox({
                        items: [
                            new Text({ text: "{name}" }),
                            new Text({ text: "{dialog>/name}" }),
                        ]
                    }),
                    buttons: [  
                        new Button({ text: "Close", press: () => dialog.close() })
                    ]
                });

                const button = event.getSource();
                const model = new JSONModel({ name: "From dialog model attached to button" });
                button.setModel(model, "dialog");

                button.addDependent(dialog);

                dialog.open();
            }
        });
    });
