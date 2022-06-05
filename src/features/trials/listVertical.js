import React from "react";
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {useState} from "react";


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const ListOne=() => {

    const listData = [];
    for (let i = 0; i < 23; i++) {
        listData.push({
            href: 'https://ant.design',
            title: `ant design part ${i}`,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }

    return(

    <List
        itemLayout="horizontal"
        size="large"
        pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 3,

        }}
        dataSource={listData}
        footer={
            <div>
                <b>ant design</b> footer part
            </div>
        }
        renderItem={item => (
            <List.Item
                key={item.title}
                // grid={}
                itemLayout="vertical"
                split={true}
                actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                ]}
                // extra={
                    // <img
                    //     aria-colspan={2}
                    //     align={"left"}
                    //     width={272}
                    //     alt="logo"
                    //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    // />
                // }
            >
                <Space>
                <img
                    aria-colspan={2}

                    align={"left"}
                    width={150}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
                    <img
                    aria-colspan={2}

                    align={"left"}
                    width={150}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />

                <List.Item.Meta
                    avatar={<Avatar shape={"square"} size={"large"} src={item.avatar}/>}
                    title={<a href={item.href}>{item.title}</a>}
                    description={<div style={{width:"50%", display:"flex", margin:"10"}}>item.description</div>}
                />
                    </Space>
                {/*{item.content}*/}
            </List.Item>
        )}
    />
    )}
