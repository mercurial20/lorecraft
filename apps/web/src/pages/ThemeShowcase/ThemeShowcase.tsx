import {
  AppstoreOutlined,
  BgColorsOutlined,
  BookOutlined,
  BranchesOutlined,
  ExperimentOutlined,
  InboxOutlined,
  KeyOutlined,
  LoadingOutlined,
  PlusOutlined,
  RocketOutlined,
  TableOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { TableProps, TabsProps } from "antd";
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Collapse,
  Drawer,
  Empty,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Skeleton,
  Space,
  Spin,
  Switch,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";

import styles from "./ThemeShowcase.module.scss";

const { Paragraph, Text, Title } = Typography;

interface WorldRecord {
  key: string;
  name: string;
  domain: string;
  status: string;
  entries: number;
  updated: string;
}

const tableData: WorldRecord[] = [
  {
    key: "aethelgard",
    name: "Aethelgard",
    domain: "Fantasy",
    status: "Active",
    entries: 248,
    updated: "Today",
  },
  {
    key: "vesper-arc",
    name: "Vesper Arc",
    domain: "Sci-fi",
    status: "Draft",
    entries: 97,
    updated: "Yesterday",
  },
  {
    key: "blackwater",
    name: "Blackwater Parish",
    domain: "Mystery",
    status: "Review",
    entries: 132,
    updated: "May 24",
  },
];

const tableColumns: TableProps<WorldRecord>["columns"] = [
  {
    title: "World",
    dataIndex: "name",
    key: "name",
    render: (name: string) => <Text strong>{name}</Text>,
  },
  {
    title: "Domain",
    dataIndex: "domain",
    key: "domain",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const color = status === "Active" ? "success" : "default";

      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Entries",
    dataIndex: "entries",
    key: "entries",
    align: "right",
  },
  {
    title: "Updated",
    dataIndex: "updated",
    key: "updated",
  },
];

const collapseItems = [
  {
    key: "taxonomy",
    label: "World taxonomy",
    children:
      "Nested lore structures should read as compact work surfaces with calm borders and enough contrast for long sessions.",
  },
  {
    key: "timeline",
    label: "Timeline rules",
    children:
      "Dense controls use the same accent rhythm as navigation: muted by default, gold for selection and confirmation.",
  },
];

const templateCards = [
  {
    title: "Fantasy Realm",
    text: "Pre-configured with magic systems, medieval-inspired factions, and geographical tagging.",
    tags: ["Magic", "Factions"],
    icon: <BookOutlined />,
  },
  {
    title: "Sci-fi Universe",
    text: "Structured for planetary systems, advanced technologies, and intergalactic species.",
    tags: ["Planets", "Tech"],
    icon: <RocketOutlined />,
  },
  {
    title: "Mystery Town",
    text: "Optimized for character relationship webs, timelines, and hidden secrets.",
    tags: ["Clues", "Networks"],
    icon: <KeyOutlined />,
  },
];

const tabItems: TabsProps["items"] = [
  {
    key: "controls",
    label: "Controls",
    children: null,
  },
  {
    key: "surfaces",
    label: "Surfaces",
    children: null,
  },
  {
    key: "data",
    label: "Data",
    children: null,
  },
];

const ThemeShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("controls");

  return (
    <main className={styles.showcase}>
      <section className={styles.hero}>
        <div className={styles.heroMark}>
          <ThunderboltOutlined />
        </div>
        <Title level={1}>Theme Showcase</Title>
        <Paragraph>
          Desktop-density Ant Design components adapted from the Lorecraft
          Figma direction.
        </Paragraph>
        <Space size={12}>
          <Button type="primary" icon={<PlusOutlined />}>
            Create World
          </Button>
          <Button>Explore Templates</Button>
        </Space>
      </section>

      <section className={styles.section}>
        <Flex align="center" justify="space-between" className={styles.header}>
          <div>
            <Text className={styles.eyebrow}>Foundations</Text>
            <Title level={2}>Color, type, spacing</Title>
          </div>
          <Tag icon={<BgColorsOutlined />}>Production tokens</Tag>
        </Flex>

        <div className={styles.foundationGrid}>
          <Card title="Palette">
            <div className={styles.swatches}>
              <span className={styles.swatchPrimary}>Primary</span>
              <span className={styles.swatchPanel}>Panel</span>
              <span className={styles.swatchRaised}>Raised</span>
              <span className={styles.swatchBorder}>Border</span>
            </div>
          </Card>

          <Card title="Typography">
            <Title level={3}>Begin your chronicle.</Title>
            <Paragraph>
              Establish a new foundational world with structured lore,
              timelines, maps, and relationships.
            </Paragraph>
            <Text type="secondary">Secondary text keeps a warm parchment tone.</Text>
          </Card>

          <Card title="Density">
            <Flex vertical gap={12}>
              <Input placeholder="Search Aethelgard..." />
              <Space wrap>
                <Tag>Magic</Tag>
                <Tag>Factions</Tag>
                <Badge count={12}>
                  <Button size="small">Mentions</Button>
                </Badge>
              </Space>
            </Flex>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <Flex align="center" justify="space-between" className={styles.header}>
          <div>
            <Text className={styles.eyebrow}>Components</Text>
            <Title level={2}>Interactive states</Title>
          </div>
          <Space>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          </Space>
        </Flex>

        <Tabs
          activeKey={activeTab}
          items={tabItems}
          onChange={setActiveTab}
        />

        {activeTab === "controls" && (
          <div className={styles.componentGrid}>
            <Card title="Buttons">
              <Space wrap>
                <Button type="primary" icon={<PlusOutlined />}>
                  Primary
                </Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="text">Text</Button>
                <Button danger>Danger</Button>
                <Button loading>Loading</Button>
              </Space>
            </Card>

            <Card title="Inputs">
              <Flex vertical gap={12}>
                <Input placeholder="World name" prefix={<BookOutlined />} />
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  placeholder="Describe the core conflict..."
                />
                <Select
                  defaultValue="fantasy"
                  options={[
                    { value: "fantasy", label: "Fantasy" },
                    { value: "sci-fi", label: "Sci-fi" },
                    { value: "mystery", label: "Mystery" },
                  ]}
                />
              </Flex>
            </Card>

            <Card title="Selection">
              <Flex vertical gap={14}>
                <Checkbox defaultChecked>Enable timeline tracking</Checkbox>
                <Radio.Group defaultValue="canon">
                  <Radio value="canon">Canon</Radio>
                  <Radio value="draft">Draft</Radio>
                </Radio.Group>
                <Flex align="center" gap={10}>
                  <Switch defaultChecked />
                  <Text>Public world index</Text>
                </Flex>
              </Flex>
            </Card>

            <Card title="Form">
              <Form layout="vertical" requiredMark="optional">
                <Form.Item label="Project title" required>
                  <Input placeholder="Aethelgard Codex" />
                </Form.Item>
                <Form.Item label="Default template">
                  <Select
                    defaultValue="realm"
                    options={[
                      { value: "realm", label: "Realm" },
                      { value: "archive", label: "Archive" },
                    ]}
                  />
                </Form.Item>
                <Button type="primary">Save Draft</Button>
              </Form>
            </Card>
          </div>
        )}

        {activeTab === "surfaces" && (
          <div className={styles.componentGrid}>
            <Card title="Template Cards" className={styles.wideCard}>
              <div className={styles.templateGrid}>
                {templateCards.map((card) => (
                  <article className={styles.templateCard} key={card.title}>
                    <div className={styles.templateArt}>{card.icon}</div>
                    <div className={styles.templateBody}>
                      <Title level={3}>{card.title}</Title>
                      <Paragraph>{card.text}</Paragraph>
                      <Space size={4}>
                        {card.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </Space>
                    </div>
                  </article>
                ))}
              </div>
            </Card>

            <Card title="Collapse">
              <Collapse defaultActiveKey={["taxonomy"]} items={collapseItems} />
            </Card>

            <Card title="Alerts">
              <Flex vertical gap={10}>
                <Alert
                  message="World saved"
                  description="The archive is ready for the next editing session."
                  showIcon
                  type="success"
                />
                <Alert
                  message="Unresolved references"
                  description="Three entities point to missing locations."
                  showIcon
                  type="warning"
                />
              </Flex>
            </Card>

            <Card title="Tags and Badges">
              <Flex vertical gap={14}>
                <Space wrap>
                  <Tag color="gold">Canon</Tag>
                  <Tag color="purple">Secret</Tag>
                  <Tag>Draft</Tag>
                </Space>
                <Space size={18}>
                  <Badge count={8}>
                    <Button icon={<BranchesOutlined />}>Links</Button>
                  </Badge>
                  <Badge status="processing" text="Syncing" />
                </Space>
              </Flex>
            </Card>
          </div>
        )}

        {activeTab === "data" && (
          <div className={styles.componentGrid}>
            <Card
              title={
                <Space>
                  <TableOutlined />
                  <span>World Index</span>
                </Space>
              }
              className={styles.wideCard}
            >
              <Table
                columns={tableColumns}
                dataSource={tableData}
                pagination={false}
                size="middle"
              />
            </Card>

            <Card title="Empty State">
              <Empty
                description="No unresolved references"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Reference
                </Button>
              </Empty>
            </Card>

            <Card title="Loading States">
              <Flex vertical gap={16}>
                <Flex align="center" gap={12}>
                  <Spin indicator={<LoadingOutlined spin />} />
                  <Text>Compiling chronicle index</Text>
                </Flex>
                <Skeleton active paragraph={{ rows: 3 }} title={false} />
              </Flex>
            </Card>

            <Card title="Status Stack">
              <Flex vertical gap={12}>
                <Alert
                  message="Map export queued"
                  showIcon
                  type="info"
                />
                <Flex align="center" gap={8}>
                  <AppstoreOutlined />
                  <Text>12 collections grouped by realm</Text>
                </Flex>
                <Flex align="center" gap={8}>
                  <ExperimentOutlined />
                  <Text type="secondary">Experimental traits are hidden.</Text>
                </Flex>
              </Flex>
            </Card>
          </div>
        )}
      </section>

      <Modal
        okText="Save"
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
        open={modalOpen}
        title="Create World"
      >
        <Flex vertical gap={12}>
          <Input placeholder="World name" />
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 4 }}
            placeholder="Opening premise"
          />
        </Flex>
      </Modal>

      <Drawer
        extra={<Button type="primary">Apply</Button>}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        title="Inspector"
        width={420}
      >
        <Flex vertical gap={16}>
          <Alert message="No API calls are used on this page." type="info" />
          <Form layout="vertical">
            <Form.Item label="Tone">
              <Select
                defaultValue="mythic"
                options={[
                  { value: "mythic", label: "Mythic" },
                  { value: "grounded", label: "Grounded" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Visible layers">
              <Checkbox.Group
                defaultValue={["characters", "places"]}
                options={[
                  { value: "characters", label: "Characters" },
                  { value: "places", label: "Places" },
                  { value: "secrets", label: "Secrets" },
                ]}
              />
            </Form.Item>
          </Form>
          <Empty
            description="No pending conflicts"
            image={<InboxOutlined className={styles.emptyIcon} />}
          />
        </Flex>
      </Drawer>
    </main>
  );
};

export default ThemeShowcase;
