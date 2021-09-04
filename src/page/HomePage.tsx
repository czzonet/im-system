import { Avatar, Card, Input, Typography } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { BLUE_DARK } from "../cssConfig";
import classNames from "classnames";
import produce from "immer";

export const HomePage = () => {
  const search = (value) => {
    setUserName(value);
    setIsLoggedIn(true);
  };
  const [messages, setMessages] = useState([
    { user: "Bob", msg: "hello" },
    { user: "Alice", msg: "hello" },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const [searchVal, setSearchVal] = useState("");
  const submit = (value) => {
    setMessages(
      produce((d) => {
        d.push({ user: userName, msg: value });
      })
    );
  };
  return (
    <Style>
      {isLoggedIn ? (
        <div className="chart">
          <div className="title">
            <Typography.Text type="secondary" style={{ fontSize: "36px" }}>
              Websocket Chat:{userName}
            </Typography.Text>
          </div>

          <div className="message">
            {messages.map((d, i) => {
              return (
                <div
                  className={classNames("card", { end: userName == d.user })}
                  key={i}
                >
                  <Card>
                    <Card.Meta
                      avatar={<Avatar>{d.user[0].toUpperCase()}</Avatar>}
                      title={d.user + ":"}
                      description={d.msg}
                    ></Card.Meta>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="bottom">
            <Input.Search
              placeholder="input message and send"
              enterButton="Send"
              size="large"
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
              onSearch={(value) => submit(value)}
            ></Input.Search>
          </div>
        </div>
      ) : (
        <div className="login">
          <Input.Search
            placeholder="Enter Username"
            enterButton="Login"
            size="large"
            onSearch={(value) => search(value)}
          ></Input.Search>
        </div>
      )}
    </Style>
  );
};

const Style = styled.div`
  height: 100%;

  .chart {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .title {
      flex: none;

      text-align: center;
      width: 100%;
      padding: 2%;
      background-color: ${BLUE_DARK};
    }

    .message {
      height: 0;
      flex: 1;
      width: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      overflow-y: auto;

      .card {
        width: 300px;
        margin: 16px 4px 0 4px;

        &.end {
          align-self: flex-end;
        }
      }
    }
    .bottom {
      position: fixed;
      left: 0;
      bottom: 0;

      width: 100%;
    }
  }

  .login {
    padding: 200px 40px;
  }
`;
