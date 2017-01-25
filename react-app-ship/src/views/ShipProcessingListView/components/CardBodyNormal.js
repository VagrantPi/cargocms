import React, { PropTypes } from 'react';
import CardStateColor from '../CardStateColor';

const defaultProps = {};

const propTypes = {
  shipOrderId: PropTypes.number,
  shipOrderNumber: PropTypes.string,
  invoiceCode: PropTypes.string,
  orderDetail: PropTypes.array,
  orderDate: PropTypes.object,
  orderSupplier: PropTypes.object,
  total: PropTypes.number,
  status: PropTypes.string,
};

function CardBodyNormal(props) {
  let stateColor = {};
  let statusCht = '';
  switch (props.status) {
    case 'NEW':
      stateColor = CardStateColor.newOrder;
      statusCht = '新訂單';
      break;
    case 'SHIPPED':
      stateColor = CardStateColor.shipped;
      statusCht = '出貨中';
      break;
    case 'PROCESSING':
      stateColor = CardStateColor.preparing;
      statusCht = '備貨中';
      break;
    case 'COMPLETED':
      stateColor = CardStateColor.completed;
      statusCht = '完成配送';
      break;
    default:
      stateColor = CardStateColor.newOrder;
  }
  return (
    <div className='cardbody'>
      <div className='order-invoice'>
        <div className='title'>
          {props.shipOrderNumber}
          {/* {props.invoiceCode.length > 1 ? (<span>({props.invoiceCode})</span>) : '' } */}
        </div>
        <div className='sub-title'>
          更新於 {props.orderDate.updatedAt}
        </div>
      </div>
      <div className='order-content'>
        <div className='title'>
          {props.orderSupplier.name} {props.orderSupplier.telephone}
        </div>
        <div className='sub-title'>
          {
            props.orderDetail.map(item => (
              `${item.name}(${item.quantity}),`
            ))
          }
        </div>
      </div>
      <div className='order-price'>
        <div className='main-title'>
          ${props.total}
        </div>
      </div>
      <div
        className='order-status'
        style={stateColor}
      >
        <div className='main-title'>
          {statusCht}
        </div>
      </div>
    </div>
  );
}

CardBodyNormal.defaultProps = defaultProps;
CardBodyNormal.propTypes = propTypes;

export default CardBodyNormal;
