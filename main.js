define([
    'base/js/namespace'
], function (
    Jupyter
) {
    function load_ipython_extension() {

        var handler = function () {
            var filename = Jupyter.notebook.notebook_name
            Jupyter.notebook.insert_cell_above('code').set_text(`
                import requests
                file = open("${filename}", "rb")

                url = "http://httpbin.org/post"
            
                response = requests.post(url, files = {"form_field_name": file})
            
                if response.ok:
                    print("Upload completed successfully!")
                    print(response.text)
                else:
                    print("Something went wrong!")
            `);
            Jupyter.notebook.select_prev();
            Jupyter.notebook.execute_cell();
            //Jupyter.notebook.delete_cell();
        };

        var action = {
            icon: 'fa-comment-o',
            help: 'submit-notebook',
            help_index: 'zz',
            handler: handler
        };
        var prefix = 'my_extension';
        var action_name = 'submit-notebook';

        var full_action_name = Jupyter.actions.register(action, action_name, prefix);
        Jupyter.toolbar.add_buttons_group([full_action_name]);
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});