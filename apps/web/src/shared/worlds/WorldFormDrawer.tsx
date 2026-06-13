import { Button, Drawer, Flex, Form, Input } from "antd";
import { useEffect } from "react";

export type WorldFormValues = {
  name: string;
};

interface WorldFormDrawerProps {
  initialValues?: WorldFormValues;
  mode: "create" | "edit";
  open: boolean;
  submitting?: boolean;
  onClose: () => void;
  onSubmit: (values: WorldFormValues) => void;
}

const FORM_ID = "world-form";

const WorldFormDrawer = ({
  initialValues,
  mode,
  open,
  submitting = false,
  onClose,
  onSubmit,
}: WorldFormDrawerProps) => {
  const [form] = Form.useForm<WorldFormValues>();
  const title = mode === "create" ? "Create world" : "Edit world";

  useEffect(() => {
    if (!open) {
      return;
    }

    form.setFieldsValue(initialValues ?? { name: "" });
  }, [form, initialValues, open]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleFinish = (values: WorldFormValues) => {
    onSubmit({
      name: values.name.trim(),
    });
  };

  return (
    <Drawer
      destroyOnHidden
      open={open}
      size={420}
      title={title}
      footer={
        <Flex justify="flex-end" gap={8}>
          <Button disabled={submitting} type="default" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            form={FORM_ID}
            htmlType="submit"
            loading={submitting}
            type="primary"
          >
            Save
          </Button>
        </Flex>
      }
      onClose={handleClose}
    >
      <Form<WorldFormValues>
        form={form}
        id={FORM_ID}
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
      >
        <Form.Item
          label="World name"
          name="name"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Enter a world name.",
            },
            {
              min: 2,
              message: "Use at least 2 characters.",
            },
            {
              max: 80,
              message: "Keep the name under 80 characters.",
            },
          ]}
        >
          <Input
            autoComplete="off"
            autoFocus
            maxLength={80}
            placeholder="The Ashen Coast"
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export { WorldFormDrawer };
