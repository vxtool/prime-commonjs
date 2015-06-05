Ext.define('extjs.view.Login', {
    extend: 'Ext.window.Window',
    requires: [
        'extjs.view.LoginModel',
        'extjs.view.LoginController'
    ],
    viewModel: {type: 'login'},
    controller: 'login',
    alias: 'widget.login',
    title: extjs.locale.LOGIN,
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    itemId: 'login',
                    fieldLabel: extjs.locale.LOGIN,
                    bind: {
                        value: '{login}'
                    }
                },
                {
                    itemId: 'password',
                    inputType: 'password',
                    fieldLabel: extjs.locale.PASSWORD,
                    bind: {
                        value: '{password}'
                    }
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            itemId: 'cancel',
            text: extjs.locale.CANCEL,
            handler: 'onCancelBtnClick'
        },
        {
            itemId: 'login',
            text: extjs.locale.LOGIN,
            handler: 'onLoginBtnClick'
        }
    ]
});