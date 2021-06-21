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
            
                response = requests.post(url, files = {"file": file})
            
                if response.ok:
                    print("Success")
                else:
                    print("Failure")
            `);
            Jupyter.notebook.select_prev();
            Jupyter.notebook.execute_cell();
            var output = ""
            var checkExist = setInterval(function() {
                if (Jupyter.notebook.get_selected_cell().output_area.outputs.length) {
                    clearInterval(checkExist);
                    output = Jupyter.notebook.get_selected_cell().output_area.outputs[0].text
                    Jupyter.notebook.delete_cell();
                    if (output.trim() === "Success") {
                        setTimeout(function() { alert("Notebook submitted!"); }, 10);
                    } else {
                        setTimeout(function() { alert("Something went wrong!"); }, 10);
                    }
                }
            }, 10);
        };

        var action = {
            icon: 'fa-upload',
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