import { Col, Collapse, Row, Typography } from 'antd';
import React from 'react';

import Loader from '@/components/Loader';
import { useCompareContext } from '@/context';

import classes from './styles.module.scss';

const { Panel } = Collapse;
const { Text } = Typography;

export default function CompareBottom({ data, isLoading }) {
  const { coins } = useCompareContext();

  const marketDataArr = [];

  for (const prop in data?.DISPLAY) {
    const arr = [];

    for (const propCurrency in data?.DISPLAY[prop]) {
      arr.push({
        currency: propCurrency,
        data: data?.DISPLAY[prop][propCurrency],
      });
    }

    marketDataArr.push({
      coin: prop,
      data: arr,
    });
  }

  const getValueByProp = (arr, prop) => {
    const res = arr.map((item) => ({
      title: item.internal,
      value: item[prop],
    }));

    return res;
  };

  const getValuesByMarketProp = (arr, prop) => {
    const res = [];

    arr.forEach((item) => {
      const obj = {
        title: item.coin,
        values: [],
      };

      item.data.forEach((itemCurency) => {
        obj.values.push(itemCurency.data[prop]);
      });

      res.push(obj);
    });

    return res;
  };

  const accordionData = [
    {
      title: 'Launch Date',
      key: '1',
      data: [
        {
          title: 'Launch Date',
          coinsValue: getValueByProp(coins, 'launchDate'),
        },
      ],
    },
    {
      title: 'Consensus',
      key: '2',
      data: [
        {
          title: 'ProofType',
          coinsValue: getValueByProp(coins, 'proofType'),
        },
        {
          title: 'Algorith',
          coinsValue: getValueByProp(coins, 'algorithm'),
        },
        {
          title: 'Block Time',
          coinsValue: getValueByProp(coins, 'blockTime'),
        },
      ],
    },
  ];

  const accordionMarketData = [
    {
      title: 'Price',
      key: '1',
      data: [
        {
          title: 'Current Price',
          coinsValues: getValuesByMarketProp(marketDataArr, 'PRICE'),
        },
        {
          title: 'High 24h',
          coinsValues: getValuesByMarketProp(marketDataArr, 'HIGH24HOUR'),
        },
        {
          title: 'Low 24h',
          coinsValues: getValuesByMarketProp(marketDataArr, 'LOW24HOUR'),
        },
      ],
    },
    {
      title: 'Supply',
      key: '2',
      data: [
        {
          title: 'Supply Market Cap',
          coinsValues: getValuesByMarketProp(
            marketDataArr,
            'CIRCULATINGSUPPLYMKTCAP',
          ),
        },
      ],
    },
    {
      title: 'Change',
      key: '3',
      data: [
        {
          title: 'Change 24h',
          coinsValues: getValuesByMarketProp(marketDataArr, 'CHANGE24HOUR'),
        },
        {
          title: 'Change 24, %',
          coinsValues: getValuesByMarketProp(marketDataArr, 'CHANGEPCT24HOUR'),
        },
      ],
    },
    {
      title: 'Market Cap',
      key: '4',
      data: [
        {
          title: 'Market Cap',
          coinsValues: getValuesByMarketProp(marketDataArr, 'MKTCAP'),
        },
      ],
    },
    {
      title: 'Volume',
      key: '5',
      data: [
        {
          title: 'Volume 24h',
          coinsValues: getValuesByMarketProp(marketDataArr, 'VOLUME24HOURTO'),
        },
      ],
    },
    {
      title: 'Last',
      key: '6',
      data: [
        {
          title: 'Last Market',
          coinsValues: getValuesByMarketProp(marketDataArr, 'LASTMARKET'),
        },
        {
          title: 'Last Volume',
          coinsValues: getValuesByMarketProp(marketDataArr, 'LASTVOLUMETO'),
        },
      ],
    },
  ];

  return (
    <div className={classes.wrap}>
      <div className={classes.wrapAccord}>
        <Collapse defaultActiveKey={['1', '2']} bordered={false}>
          {accordionData?.map((item) => (
            <Panel header={item.title} key={item.key}>
              {item.data.map((dataItem) => (
                <div key={dataItem.title} className={classes.row}>
                  <Text strong>{dataItem.title}</Text>
                  <Row gutter={[10, 10]}>
                    {dataItem.coinsValue?.map((coinValue) => (
                      <Col
                        xs={{ span: 12 }}
                        sm={{ span: 8 }}
                        lg={{ span: 6 }}
                        xl={{ span: 4 }}
                        key={coinValue.title}
                      >
                        <p className={classes.value}>{coinValue.value}</p>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>

      <div className={classes.wrapAccord}>
        <Loader active={isLoading} size='large'>
          <Collapse
            defaultActiveKey={['1', '2', '3', '4', '5', '6']}
            bordered={false}
          >
            {accordionMarketData?.map(({ title, data, key }) => (
              <Panel header={title} key={key}>
                {data?.map(({ title, coinsValues }) => (
                  <div key={title}>
                    <Text strong>{title}</Text>
                    <Row gutter={[10, 10]}>
                      {coinsValues?.map(({ title, values }) => (
                        <Col
                          xs={{ span: 12 }}
                          sm={{ span: 8 }}
                          lg={{ span: 6 }}
                          xl={{ span: 4 }}
                          key={title}
                        >
                          {values?.map((value, idx) => (
                            <p
                              className={classes.value}
                              key={`${value}-${idx}`}
                            >
                              {value}
                            </p>
                          ))}
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>
        </Loader>
      </div>
    </div>
  );
}
