var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this.state = {
      power: true,
      timerLabel: 'Session',
      break: 5,
      session: 25,
      timer: 1500 };

    _this.displayTime = _this.displayTime.bind(_this);
    _this.countTime = _this.countTime.bind(_this);
    _this.timerLabelToggle = _this.timerLabelToggle.bind(_this);
    _this.countdownCheck = _this.countdownCheck.bind(_this);
    _this.manageBreakLength = _this.manageBreakLength.bind(_this);
    _this.manageSessionLength = _this.manageSessionLength.bind(_this);
    _this.updateSession = _this.updateSession.bind(_this);
    _this.updateBreak = _this.updateBreak.bind(_this);
    _this.reset = _this.reset.bind(_this);return _this;
  }_createClass(App, [{ key: "manageBreakLength", value: function manageBreakLength(
    e) {var _this2 = this;
      if (this.state.power) {
        if (e.target.value == "-") {this.state.break > 1 ? this.setState({ break: this.state.break - 1 }) : this.setState({ break: this.state.break });
        } else if (e.target.value == "+") {this.state.break < 60 ? this.setState({ break: this.state.break + 1 }) : this.setState({ break: this.state.break });
        }
        if (this.state.timerLabel === "Break") {setTimeout(function () {_this2.updateBreak();}, 1);
        }
      } else {return;}
    } }, { key: "updateBreak", value: function updateBreak()
    {
      this.state.break < 10 ? this.setState({ timer: this.state.break * 60, time_left: "0" + this.state.break + ':00' }) : this.setState({ timer: this.state.break * 60, time_left: this.state.break + ':00' });
    } }, { key: "manageSessionLength", value: function manageSessionLength(
    e) {var _this3 = this;
      if (this.state.power) {
        if (e.target.value == "-") {this.state.session > 1 ? this.setState({ session: this.state.session - 1 }) : this.setState({ session: this.state.session });
        } else
        if (e.target.value == "+") {this.state.session < 60 ? this.setState({ session: this.state.session + 1 }) : this.setState({ session: this.state.session });
        }
        if (this.state.timerLabel === "Session") {setTimeout(function () {_this3.updateSession();}, 1);
        } else {return;}
      } else {return;}
    } }, { key: "updateSession", value: function updateSession()
    {
      this.state.session < 10 ? this.setState({ timer: this.state.session * 60, time_left: '0' + this.state.session + ':00' }) : this.setState({ timer: this.state.session * 60, time_left: this.state.session + ':00' });
    } }, { key: "countdownCheck", value: function countdownCheck()
    {
      var timeLeft = this.state.timer;
      this.playAlarm(timeLeft);
      if (timeLeft < 0) {
        this.state.timerLabel == 'Session' ? (clearInterval(this.state.interval), this.timerLabelToggle(this.state.break * 60, 'Break'), this.setState({ power: true }), this.countTime()) : (clearInterval(this.state.interval), this.timerLabelToggle(this.state.session * 60, 'Session'), this.setState({ power: true }), this.countTime());
      }
    } }, { key: "playAlarm", value: function playAlarm(
    _timeLeft) {
      if (_timeLeft === 0) {document.getElementById('beep').play();}
    } }, { key: "timerLabelToggle", value: function timerLabelToggle(
    timePeriod, label) {
      this.setState({
        timer: timePeriod,
        timerLabel: label });

    } }, { key: "countTime", value: function countTime()
    {var _this4 = this;
      if (this.state.power) {
        this.setState({ power: false });
        this.state.interval = setInterval(function () {_this4.setState({ timer: _this4.state.timer - 1 }), _this4.countdownCheck();}, 1000);
      } else
      {
        clearInterval(this.state.interval);
        this.setState({ power: true });
      }
    } }, { key: "displayTime", value: function displayTime()
    {
      var min = Math.floor(this.state.timer / 60);
      var sec = this.state.timer - min * 60;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      return min + ":" + sec;
    } }, { key: "reset", value: function reset()
    {
      clearInterval(this.state.interval);this.setState({ power: true, break: 5, session: 25, timer: 1500, timerLabel: 'Session', time_left: '25:00' });
      document.getElementById('beep').pause();
      document.getElementById('beep').currentTime = 0;
      console.log('reset');
    } }, { key: "render", value: function render()
    {
      var startToggle = this.state.power ? 'fa fa-play' : 'fa fa-pause';
      return (
        React.createElement("div", { id: "container" },
          React.createElement("div", { id: "time-left", onClick: this.countTime }, this.displayTime()),
          React.createElement("div", { id: "controls" },
            React.createElement("div", { id: "breakManagement" },
              React.createElement("button", { id: "break-decrement", value: "-", onClick: this.manageBreakLength, "class": "fa fa-minus-square" }),
              React.createElement("div", { id: "break-length" }, this.state.break),
              React.createElement("button", { id: "break-increment", value: "+", onClick: this.manageBreakLength, "class": "fa fa-plus-square" }),
              React.createElement("div", { id: "break-label" }, "Break")),

            React.createElement("div", { id: "countDown" },
              React.createElement("div", { id: "timer-label" }, this.state.timerLabel),
              React.createElement("button", { id: "start_stop", onClick: this.countTime, "class": startToggle }),
              React.createElement("button", { id: "reset", onClick: this.reset, "class": "fa fa-retweet" }),
              React.createElement("audio", { id: "beep", preload: "auto", src: "https://www.myinstants.com/media/sounds/alarme-factorio.mp3" })),

            React.createElement("div", { id: "sessionManagement" },
              React.createElement("button", { type: "button", id: "session-decrement", value: "-", onClick: this.manageSessionLength, "class": "fa fa-minus-square" }),
              React.createElement("div", { id: "session-length" }, this.state.session),
              React.createElement("button", { type: "button", id: "session-increment", value: "+", onClick: this.manageSessionLength, "class": "fa fa-plus-square" }),
              React.createElement("div", { id: "session-label" }, "Session"))),



          React.createElement("footer", null,
            React.createElement("a", { href: "https://www.freecodecamp.org/challenges/learn-how-freecodecamp-works", target: "_blank" }, " ", React.createElement("img", { id: "fFCLogo", src: "https://design-style-guide.freecodecamp.org/downloads/freeCodeCamp-alternative.png" })),
            React.createElement("br", null), "Coded by Victor Cojocaru 2018")));




    } }]);return App;}(React.Component);

ReactDOM.render(React.createElement(App, null), app);