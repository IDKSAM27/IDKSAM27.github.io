// components/ComplexComputerGraphic.js
import React from 'react';

const ComplexComputerGraphic = () => {
  return (
    <>
      <div className="comp-wrap">
        <div className="comp">
          <div className="monitor">
            <div className="mid">
              <div className="site">
                <div className="topbar">
                  <div className="cerrar">
                    <div className="circl"></div>
                    <div className="circl"></div>
                    <div className="circl"></div>
                  </div>
                </div>
                <div className="inhead">
                  <div className="mid">
                    <div className="item"></div>
                  </div>
                  <div className="mid txr">
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                  </div>
                </div>
                <div className="inslid"></div>
                <div className="incont">
                  <div className="item"></div>
                  <div className="item"></div>
                  <div className="item"></div>
                  <div className="item"></div>
                  <div className="wid">
                    <div className="itwid">
                      <div>
                        <div className="contfoot"></div>
                      </div>
                    </div>
                    <div className="itwid">
                      <div>
                        <div className="contfoot"></div>
                      </div>
                    </div>
                    <div className="itwid">
                      <div>
                        <div className="contfoot"></div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="infoot"></div>
                </div>
              </div>
            </div>
            <div className="mid codigo">
              <div className="line">
                <div className="item var"></div>
                <div className="item cont"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line">
                <div className="item min var"></div>
                <div className="item min fun"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line">
                <div className="item min var"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line">
                <div className="item var"></div>
                <div className="item atr"></div>
                <div className="item cont"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab1">
                <div className="item min atr"></div>
                <div className="item lrg fun"></div>
                <div className="item min fun"></div>
                <div className="item lrg cont"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab1">
                <div className="item lrg atr"></div>
                <div className="item min fun"></div>
                <div className="item min cont"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab1">
                <div className="item atr"></div>
                <div className="item min fun"></div>
                <div className="item atr"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab1">
                <div className="item min atr"></div>
                <div className="item min cont"></div>
                <div className="item lrg atr"></div>
                <div className="item fun"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab1">
                <div className="item min atr"></div>
                <div className="item lrg fun"></div>
                <div className="item lrg cont"></div>
                <div className="item min fun"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab1">
                <div className="item min var"></div>
                <div className="clearfix"></div>
              </div>
               <div className="line tab1">
                <div className="item min var"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab2">
                <div className="item min var"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab2">
                <div className="item min atr"></div>
                <div className="item min fun"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab3">
                <div className="item min atr"></div>
                <div className="item min fun"></div>
                <div className="item lrg fun"></div>
                <div className="item lrg cont"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab3">
                <div className="item min atr"></div>
                <div className="item min fun"></div>
                <div className="item lrg atr"></div>
                <div className="item lrg cont"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab4">
                <div className="item min fun"></div>
                <div className="item lrg atr"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab1">
                <div className="item atr"></div>
                <div className="item var"></div>
                <div className="item cont"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab3">
                <div className="item min var"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line tab4">
                <div className="item min atr"></div>
                <div className="item min fun"></div>
                <div className="item lrg atr"></div>
                <div className="item lrg cont"></div>
                <div className="clearfix"></div>
              </div>
              <div className="line">
                <div className="item min var"></div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
          <div className="base"></div>
        </div>
      </div>
      <style jsx>{`
        .clearfix:before,
        .clearfix:after {
          content: "";
          display: table;
        }
        .clearfix:after {
          clear: both;
        }
        .clearfix {
          zoom: 1;
        }
        .comp-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .comp {
          width: 100%;
          height: 194px;
          text-align: center;
        }
        .comp .monitor {
          width: 275px;
          height: 181px;
          display: block;
          margin: 0 auto;
          border-radius: 10px 10px 0px 0px;
          padding: 9px;
          border: solid 1px #e0e2e2;
          background-color: black;
        }
        .comp .mid {
          float: left;
          display: block;
          height: 100%;
          position: relative;
          background-color: #abadc6;
          width: 50%;
        }
        .comp .mid.codigo {
          background-color: #22262b;
        }
        .comp .site {
          overflow: hidden;
          position: absolute;
          width: 105px;
          height: 138px;
          bottom: 0;
          right: 0;
        }
        .comp .site .topbar {
          width: 100%;
        }
        .comp .site .cerrar {
          width: 100%;
          padding: 3px;
          line-height: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          border-radius: 4px 4px 0px 0px;
          background-color: #afa895;
        }
        .comp .site .cerrar > div {
          display: inline-block;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: white;
          margin: 0px 1px;
        }
        .comp .site .inhead {
          padding: 2px;
          height: 5px;
          background-color: #ddd8cf;
        }
        .comp .site .inhead .item {
          width: 10px;
          height: 1px;
          background-color: #d1c9bf;
          margin: 0 1px;
          display: block;
          float: left;
        }
        .comp .txr {
          text-align: right;
        }
        .comp .txr .item {
          float: right;
        }
        .comp .inslid {
          width: 100%;
          height: 33px;
          background-color: #efebe2;
        }
        .comp .incont {
          padding-top: 10px;
          background: #fefaf0;
        }
        .comp .incont .item {
          background-color: #d1c9bf;
          width: 53px;
          height: 2px;
          display: block;
          margin: 0 auto;
          margin-top: 1px;
        }
        .comp .incont .item:nth-child(1) {
          width: 20px;
        }
        .comp .incont .item:nth-child(2) {
          margin-top: 3px;
          width: 41px;
        }
        .comp .incont .item:nth-child(3) {
          width: 32px;
        }
        .comp .incont .item:nth-child(4) {
          width: 23px;
        }
        .comp .incont .wid {
          width: 100%;
          padding: 8px 1px;
        }
        .comp .incont .wid .itwid {
          width: 33.333%;
          float: left;
          height: 26px;
          padding: 0px 3px;
        }
        .comp .incont .wid .itwid > div {
          width: 100%;
          height: 100%;
          background-color: #f5f1e6;
          position: relative;
        }
        .comp .incont .wid .itwid > div .contfoot {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 6px;
          width: 100%;
          background-color: #ebe5dc;
        }
        .comp .incont .infoot {
          background-color: #efebe2;
          height: 26px;
          width: 100%;
        }
        .comp .codigo {
          padding: 14px 0px 14px 14px;
        }
        .comp .codigo .var {
          background-color: #ac5e47;
          animation: code 0.3s infinite;
        }
        .comp .codigo .cont {
          background-color: #464748;
          animation: code 0.5s infinite;
        }
        .comp .codigo .fun {
          background-color: #fbb053;
          animation: code 0.2s infinite;
        }
        .comp .codigo .atr {
          background-color: #645572;
          animation: code 0.1s infinite;
        }
        .comp .codigo .item {
          height: 3px;
          width: 20px;
          float: left;
          margin-right: 3px;
        }
        .comp .codigo .item.min {
          width: 13px;
        }
        .comp .codigo .item.lrg {
          width: 30px;
        }
        .comp .codigo .line {
          padding: 2px 0;
          width: 100%;
        }
        .comp .codigo .tab1 {
          padding-left: 5px;
        }
        .comp .codigo .tab2 {
          padding-left: 8px;
        }
        .comp .codigo .tab3 {
          padding-left: 10px;
        }
        .comp .codigo .tab4 {
          padding-left: 12px;
        }
        .base {
          width: 338px;
          height: 12px;
          background: #e0e2e2;
          display: block;
          margin: 0 auto;
          border-radius: 0px 0px 6px 6px;
        }
        @keyframes code {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default ComplexComputerGraphic;
