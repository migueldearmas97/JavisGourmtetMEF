const customInitForro = () => {
    function initForro() {
        console.log('ejecuto');

        var all = document.querySelector('#forro');
        if (all) {
            all.click();
        }

    }
    initForro();
}
customInitForro();