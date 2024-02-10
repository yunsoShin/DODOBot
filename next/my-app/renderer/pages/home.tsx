import React from "react";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import {
  Layout,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
} from "antd";
import autoSpeedGo from "./api/autoSpeedGo";
import SpeedGo from "../components/SpeedGo";
const { Header, Content } = Layout;
const { Item: FormItem } = Form;
const { Option } = Select;

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home Page</title>
      </Head>
      <Layout>
        <Header>헤더 부분</Header>
        <Content>
          <SpeedGo></SpeedGo>
          <div>페이지 로드가 완료되었습니다.</div>

          {/* 필요한 경우 데이터를 더 활용한 UI 구성 */}
        </Content>
      </Layout>
    </React.Fragment>
  );
}
