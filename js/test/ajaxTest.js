describe("Ajax Tests", function() {
    var configuration = { url: "data.json" };

    it("should make an Ajax request to the correct URL", function() {
        spyOn($, "ajax");
        sendRequest(undefined, configuration);
        expect($.ajax.mostRecentCall.args[0]["url"]).toEqual(configuration.url);
    });

    it("should receive a successful response", function() {
        spyOn($, "ajax").andCallFake(function(e) {
            e.success({});
        });

        var callbacks = {
            drawTable: jasmine.createSpy(),
            displayErrorMessage: jasmine.createSpy(),
        };

        sendRequest(callbacks, configuration);
        expect(callbacks.drawTable).toHaveBeenCalled();  //Verifies this was called
        expect(callbacks.displayErrorMessage).not.toHaveBeenCalled();  //Verifies this was NOT called
    });

    it("should receive an Ajax error", function() {
        spyOn($, "ajax").andCallFake(function(e) {
            e.error({});
        });

        var callbacks = {
            displayErrorMessage : jasmine.createSpy()
        };

        sendRequest(callbacks, configuration);
        expect(callbacks.displayErrorMessage).toHaveBeenCalled();

    });

    it("should return an error message when no results found", function() {
        var message
        model.search(function(error) {
            message = error;
        });

        request = jasmine.Ajax.requests.mostRecent();

        jasmine.Ajax.requests.mostRecent().response({
            "status": 200,
            "contentType": "text/plain",
            "responseText": "[]"
        });

        expect(message).toEqual("No json data.");
    });

    it("should return the specified error message when the error response text exists", function() {
        var message
        model.search(function(error) {
            message = error;
        });

        request = jasmine.Ajax.requests.mostRecent();

        jasmine.Ajax.requests.mostRecent().response({
            "status": 400,
            "contentType": "text/plain",
            "responseText": "Error!"
        });

        expect(message).toEqual("Error!");
    });
});
