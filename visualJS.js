var vJS = (function(visualJS) {

    /* Define App Control */
    var logBox,
        execution;

    function LogBox() {

        this.create = function() {
            this.box = document.createElement('div');
            this.box.className = 'log-box';
            document.body.appendChild(this.box);
        };

        this.log = function(p_title, p_message) {
            var _message = document.createElement('p');
            _message.innerText = p_title + ":\n\n" + p_message;
            this.box.appendChild(_message);
        }

    }

    function Execution(p_logBox) {

        var _chain = [];

        this.addHandler = function(p_function, p_description_array) {
            _chain.push({
                func: p_function,
                desc: p_description_array
            });
        }

        var _nextStep = function() {

            if (_chain.length > 0) {

                var _nextButton = document.createElement('button');
                _nextButton.textContent = "Execute step";

                var _description = "";
                for (var i = 0; i < _chain[0].desc.length; i++) {
                    _description += _chain[0].desc[i] + "\n";
                }

                p_logBox.log("You are going to execute:", _description);

                _nextButton.onclick = function() {

                    _chain[0].func();
                    _chain.shift();

                    p_logBox.box.textContent = "";

                    _nextStep();
                }

                p_logBox.box.appendChild(_nextButton);

            }

        }

        this.execute = function() {
            _nextStep();
        }

    }

    logBox = new LogBox();
    execution = new Execution(logBox);


    /* Define the space */

    var _space = {};
    _space.universe = document.body.appendChild(document.createElement('div'));
    _space.universe.className = "space";

    _space.getRandomPos = function() {

        return {
            x: Math.random() * _space.universe.offsetWidth + "px",
            y: Math.random() * _space.universe.offsetHeight + "px"
        }
    };

    /*
     * Define the Catalog of World Elements  - Class definitions
     */

    //God Class
    function God() {

        /* Private Variables */
        var _name = "God";

        /* Public Variables */

        /* Run */
        this.create();
        this.move();
    };

    God.prototype.create = function() {

        /* Public Variables */
        this.body = document.createElement("div");
        this.body.className += " god";
        _space.universe.appendChild(this.body);

    };

    God.prototype.move = function() {
        var that = this;
        setInterval(function() {
            that.body.style.left = _space.getRandomPos().x;
        }, 2000);

    };

    God.prototype.createWorld = function() {

    }


    //Person class
    function Person(name, age, genre) {

        this.name = name || "mini" + Math.random() * 1000;
        this.age = age || Math.random() * 100;
        this.genre = genre || "male";

    }

    Person.prototype.create = function( ) {
        /* Public Variables */
        this.body = document.createElement("div");
        this.body.className += this.genre;

        _space.universe.appendChild(this.body);

        this.body.style.left = _space.getRandomPos().x;
        this.body.style.top = _space.getRandomPos().y;

        this.move();

    };

    Person.prototype.moveHorizontal = function(){
        this.body.style.left = _space.getRandomPos().x;
    }

    Person.prototype.moveVertial = function(){
        this.body.style.top = _space.getRandomPos().y;
    }

    Person.prototype.move = function() {
        var that = this;
        setInterval(function() {
            if(Math.random()*2 > 1){
                that.moveHorizontal();
            }else{
                that.moveVertial();
            }
        }, Math.random() * 4000);

    };

    Person.prototype.sayHello = function() {

    }

    function Girl( name, age, genre){
    	Person.apply(this, [name, age, "female"]);
    }

    Girl.prototype = new Person();


    /* Define the real world instance */

    var _realWorld = {};
    _realWorld.People = [];



    /* Chain of execution */
    visualJS.run = function() {

        /* We create the logBox to provide user info */
        logBox.create();


        /* Universe steps */
        var _createGod = function() {
            _realWorld.GOD = new God();
        }
        execution.addHandler(_createGod, [God, _createGod, God.prototype.create]);


        var _createPersons = function() {

            var MEN = 20;
            var _man;
            for (var i = 0; i < MEN; i++) {
            	_man = new Person();
            	_man.create();
                _realWorld.People.push(_man);
            }
        }

        execution.addHandler(_createPersons, [Person, _createPersons]);

        var _createGirl = function() {

            var WOMEN = 20;
            var _woman;
            for (var i = 0; i < WOMEN; i++) {
            	_woman = new Girl();
            	_woman.create();
                _realWorld.People.push(_woman);
            }
        }

        execution.addHandler(_createGirl, [Girl, _createGirl]);




        execution.execute();

    }


    return visualJS;

}(vJS || {}));


vJS.run();
