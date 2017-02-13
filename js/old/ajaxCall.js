$.ajaxSetup({ cache: false });
function AjaxCall(url1,type1,data1,success1,fail1) {
    this.url = url1;
    this.type = type1;
    this.data = data1;
    this.success = success1;
    this.fail = fail1;
    this.callback = function () {
        $.ajaxSettings.url = this.url;
        $.ajaxSettings.type = this.type;
        // $.ajaxSettings.dataType = "json";
      //  $.ajaxSettings.dataType = "jsonp";
        $.ajaxSettings.crossDomain = true;
        $.ajaxSettings.cache = false;
        // $.ajaxSettings.contentType = "application/json";
        $.ajaxSettings.contentType = "text/json";
        // $.ajaxSettings.contentType = "text/json; charset = utf-8";

        $.ajaxSettings.data = this.data;
        $.ajaxSettings.success = this.success;
        $.ajaxSettings.error = this.fail;
       // $.ajaxSettings.complete = com;
        $.ajax();
    };

    function com(jqXHR, textStatus) {
        //alert("com");
        if (status === 'error' || !xhr.responseText) {
            this.fail(jqXHR, textStatus);
        }
        else {
            var data = xhr.responseText;
            //...
            this.success(data);
        }

    }

}