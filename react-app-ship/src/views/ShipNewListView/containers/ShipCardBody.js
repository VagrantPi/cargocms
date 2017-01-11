import React, { PropTypes } from 'react';
import CardBodyNormal from '../components/CardBodyNormal';
import CardBodyExpend from '../components/CardBodyExpend';
import DialogShip from '../components/DialogShip';

export default class ShipCardBody extends React.Component {
  static defaultProps = {
    toast: null,
    isExpend: false,
  };

  static propTypes = {
    shipOrderId: PropTypes.number,
    toast: PropTypes.func,
    isExpend: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dialogShipOpen: false,
      dialogPrintOpen: false,
    };
  }

  stopPropagation = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  handleDialogShipOpen = (event) => {
    this.stopPropagation(event);
    const state = this.state.dialogShipOpen;
    this.setState({
      dialogShipOpen: !state,
    });
  }

  handleDialogShipClose = () => {
    this.setState({ dialogShipOpen: false });
    this.props.toast('操作成功！');
  }

  handleDialogPrintOpen = (event) => {
    this.stopPropagation(event);
    const state = this.state.dialogPrintOpen;
    this.setState({
      dialogPrintOpen: !state,
    });
  }

  handleDialogPrintClose = () => {
    this.setState({ dialogPrintOpen: false });
    this.props.toast('操作成功！');
  }


  render() {
    const cardBody = this.props.isExpend ?
        (<CardBodyExpend
          {...this.props}
          handleBtnShip={this.handleDialogShipOpen}
          handleBtnPrint={this.handleDialogPrintOpen}
        />) :
        (<CardBodyNormal {...this.props} />);
    return (
      <div className='cardbody-wrapper'>
        {cardBody}
        <DialogShip
          content={'確認訂單資訊'}
          modal={false}
          leftOnPress={this.handleDialogShipClose}
          rightOnPress={(a) => {console.log(a)}}
          open={this.state.dialogShipOpen}
          toast={this.props.toast}
        />
        <DialogShip
          content={'確定要列印出貨單嗎？'}
          modal={false}
          leftOnPress={this.handleDialogPrintClose}
          rightOnPress={() => {console.log("!!!!!");}}
          open={this.state.dialogPrintOpen}
          toast={this.props.toast}
        />
      </div>
    );
  }
}
