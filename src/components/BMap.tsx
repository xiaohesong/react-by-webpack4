import React from 'react';
import Map from 'baidu-component';

const configs = {
  lines: {
    expect: {
      desc: '预估路线',
      line: [[120.110311, 30.287103], [120.110468, 30.287115], [120.110662, 30.287127], [120.111029, 30.287139], [120.111597, 30.287249]],
      points: {
        // 订单起点
        expectStart: { point: [120.110311, 30.287103], icon: '0' },
        // 订单终点
        expectEnd: { point: [120.111597, 30.287249], icon: '1' }
      }
    },
  }
}

function MainMap() {
  return <Map ak='olqtPciVr8PWFoKFnNWof0j0uIMukGE4' configs={configs} />
}

export default MainMap