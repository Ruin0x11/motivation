

(function(){
    var $  = document.getElementById.bind(document);
    var $$ = document.querySelectorAll.bind(document);

    var App = function($el){
        this.$el = $el;
        this.load();

        this.$el.addEventListener(
                'submit', this.submit.bind(this)
                );

        if (this.dob) {
            this.renderAgeLoop();
        } else {
            this.renderChoose();
        }
    };

    App.fn = App.prototype;

    App.fn.midnight = function() {
        var midnight = new Date();
        midnight.setHours( 24 );
        midnight.setMinutes( 0 );
        midnight.setSeconds( 0 );
        midnight.setMilliseconds( 0 );
        return midnight;
    }

    App.fn.nextHour = function() {
        var date = new Date();
        var minutes = 60 - date.getMinutes();
        return new Date(date.getTime() + 60000 * minutes)
    }

    App.fn.loadMotivators = function() {
        var value;
    }

    App.fn.load = function(){
        var value;

        this.wallpapers = localStorage['wallpapers'].split('\n');
        this.motivator = {"item":"", "author":""}

        if (value = localStorage.dob)
            this.dob = new Date(parseInt(value));

        if (value = localStorage.changeDate)
            this.changeDate = new Date(parseInt(value))
        else
            this.changeDate = new Date(0)
                if (value = localStorage.wallpaperIdx) {
                    if (value >= this.wallpapers.length)
                        this.wallpaperIdx = 0
                    else
                        this.wallpaperIdx = value;
                }


        if (value = localStorage.motivatorIdx) { 
            if (value >= motivators.length)
                this.motivatorIdx = 0;
            else
                this.motivatorIdx = value;
        }
        else
            this.motivatorIdx = 0;
        var motivators = [ {
                "body": "Losers have inspiration, productive people have systems.",
                "author": "guy"
            }, {
                "body" : "Part of growing up is learning to prioritize what you need to do, even if it isn't fun, over what you like to do.",
                "author" : "bane"
            }, {
                "body": "A man must choose a path which will let his Abilities function at maximum efficiency toward the gratification of his Desires. ",
                "author": "Hunter S. Thomspon"} ] 


        if(this.changeDate.getTime() - new Date().getTime() < 0) {
            this.motivatorIdx = Math.floor(Math.random()*motivators.length);
            this.wallpaperIdx = Math.floor(Math.random()*this.wallpapers.length);
        }

        this.motivator = motivators.length == 0 ? {"body":"", "author":""} : motivators[this.motivatorIdx];
        $$('.motivator-body')[0].innerHTML = this.motivator.body;
        $$('.motivator-author')[0].innerHTML = this.motivator.author;

        this.loadMotivators();

        this.wallpaper = this.wallpapers.length == 0 ? '' : this.wallpapers[this.wallpaperIdx];

        $$('body')[0].style.backgroundImage = "url(" + this.wallpaper + ")";
    };

    App.fn.save = function(){
        if (this.dob)
            localStorage.dob = this.dob.getTime();
        if(this.changeDate) {
            if(this.changeDate.getTime() - new Date().getTime() < 0) {
                this.wallpaperIdx = Math.floor(Math.random()*this.wallpapers.length);
                localStorage.changeTime = this.changeTime.getTime();
            }
        }
    };

    App.fn.submit = function(e){
        e.preventDefault();

        var input = this.$$('input')[0];
        if ( !input.valueAsDate ) return;

        this.dob = input.valueAsDate;
        this.save();
        this.renderAgeLoop();
    };

    App.fn.renderChoose = function(){
        this.html(this.view('dob')());
    };

    App.fn.renderAgeLoop = function(){
        this.interval = setInterval(this.renderAge.bind(this), 100);
    };

    App.fn.renderAge = function(){
        var now       = new Date;
        var duration  = now - this.dob;
        var years     = duration / 31556900000;

        var majorMinor = years.toFixed(9).toString().split('.');

        requestAnimationFrame(function(){
            this.html(this.view('age')({
                year:         majorMinor[0],
                milliseconds: majorMinor[1]
            }));
        }.bind(this));
    };

    App.fn.$$ = function(sel){
        return this.$el.querySelectorAll(sel);
    };

    App.fn.html = function(html){
        this.$el.innerHTML = html;
    };

    App.fn.view = function(name){
        var $el = $(name + '-template');
        return Handlebars.compile($el.innerHTML);
    };

    window.app = new App($('app'))

})();
