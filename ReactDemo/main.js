var React = require('react');
var ReactDOM = require('react-dom');

var orange = 'rgb(242,80,34)';
var yellow = 'rgb(255,185,1)';
var green = 'rgb(127,186,0)';
var blue = 'rgb(1,164,239)';

var fontFamily = 'Segoe UI, sans-serif';
var fontSize = '1em';

var outerStyle = {
  display:'inline-block',
  width:'48%',
  padding: '0.5% 1% 0.5% 1%'
}

var innerStyle = {
  padding: '1em 1em 1em 1em',
      'font-family': fontFamily,
      'font-size': fontSize,
      'background-color': 'white'
}

var ActionHeaderRow = React.createClass({

  render: function() {

    return (
      <div>
        <div style={outerStyle}>
          <div style={innerStyle}>
            Available Actions
          </div>
        </div>
        <div style={outerStyle}>
          <div style={innerStyle}>
            Applied Actions
          </div>
        </div>
      </div>
    );
  }
});

var ActionRow = React.createClass({
  getInitialState: function() {
    return {applied: false};
  },

  handleClick: function() {
    this.props.onChange(!this.state.applied);
    this.setState({applied: !this.state.applied});
  },

  render: function() {
    
    var buttonStyle = {
      padding: '1em 1em 1em 1em',
      'font-family': fontFamily,
      'font-size': fontSize,
      'background-color': this.props.color,
      color: 'white',
      cursor: 'pointer'
    }

    var availableText = this.state.applied ? '' : this.props.name;
    var availableClick = this.state.applied ? null : this.handleClick;
    var availableStyle = this.state.applied ? innerStyle : buttonStyle;

    var appliedText = this.state.applied ? this.props.name : '';
    var appliedClick = this.state.applied ? this.handleClick : null;
    var appliedStyle = this.state.applied ? buttonStyle : innerStyle;
    return (
      <div>
        <div style={outerStyle}>
          <div style={availableStyle} onClick={availableClick}>
            {availableText}
          </div>
        </div>
        <div style={outerStyle}>
          <div style={appliedStyle} onClick={appliedClick}>
            {appliedText}
          </div>
        </div>
      </div>
    );
  }
});

var ActionMenu = React.createClass({

  render: function() {
    return (
      <div>
        <ActionHeaderRow />
        <ActionRow name='Rotate' color={orange} onChange={this.props.rotate}/>
        <ActionRow name='Translate' color={yellow} onChange={this.props.translate}/>
        <ActionRow name='Scale' color={green} onChange={this.props.scale}/>
        <ActionRow name='Opacity' color={blue} onChange={this.props.opacity}/>
      </div>
    );
  }
});

var ImageMenu = React.createClass({

  loadFile: function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
  },

  render: function() {
    var rotateString = this.props.rotateApplied ? 'rotate(45deg) ' : 'rotate(0deg) ';
    var translateString = this.props.translateApplied ? 'translateX(-40px) ' : 'translateX(0px) ';
    var scaleString = this.props.scaleApplied ? 'scale(0.5,0.5)' : 'scale(1.0,1.0)';
    var opacityString = this.props.opacityApplied ? '0.5' : '1.0';
    var transformString = rotateString + translateString + scaleString;

    var inputStyle = {
      display: 'block',
      margin: 'auto'
    };
    var imageStyle = {
      display: 'block',
      margin: 'auto',
      transform: transformString,
      opacity: opacityString
    };

    return (
      <div>
        <img id="output" style={imageStyle}/><br />
        <input type="file" accept="image/*" onChange={this.loadFile} style={inputStyle}/>
      </div>
    );
  }
});
  
var TransformableImageInterface = React.createClass({
  
  getInitialState: function() {
    return {
      rotateApplied: false,
      translateApplied: false,
      scaleApplied: false,
      opacityApplied: false
    }
  },

  setRotateApplied: function(rotateApplied) {
    this.setState({rotateApplied: rotateApplied});
  },
  setTranslateApplied: function(translateApplied) {
    this.setState({translateApplied: translateApplied});
  },
  setScaleApplied: function(scaleApplied) {
    this.setState({scaleApplied: scaleApplied});
  },
  setOpacityApplied: function(opacityApplied) {
    this.setState({opacityApplied: opacityApplied});
  },

  render: function() {
    return (
      <table width="100%">
        <tr>
          <td width="40%">
            <ImageMenu
              rotateApplied={this.state.rotateApplied}
              translateApplied={this.state.translateApplied}
              scaleApplied={this.state.scaleApplied}
              opacityApplied={this.state.opacityApplied}
            />
          </td>
          <td width="60%">
            <ActionMenu
              rotate={this.setRotateApplied}
              translate={this.setTranslateApplied}
              scale={this.setScaleApplied}
              opacity={this.setOpacityApplied}
            />
          </td>
        </tr>
      </table>
    );
  }
});

React.render(<TransformableImageInterface />, document.body);