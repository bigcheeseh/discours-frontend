import { Form, Formik, FormikActions, FormikProps } from "formik";
import { T } from "lioness";
import React from "react";
import Button from "src/components/discours-ui-kit/Button";
import Icon from "src/components/discours-ui-kit/Icon";
import { submit } from "src/components/discours-ui-kit/Icon/icons";
import Input from "src/components/discours-ui-kit/Input";
import Typography from "src/components/discours-ui-kit/Typography";
import * as Yup from "yup";

interface FooterSubscribeFormValues {
  email: string;
}

export interface FooterSubscribeFormProps {
  isSubmitted: boolean;
  onReset(): void;
  onSubmit(
    values: FooterSubscribeFormValues,
    actions: FormikActions<FooterSubscribeFormValues>,
  ): Promise<void>;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Должен быть имэйлом")
    .required("Обязательно"),
});

class FooterSubscribeForm extends React.PureComponent<
  FooterSubscribeFormProps
> {
  public render() {
    return (
      <div>
        <Typography isInverse>
          <T message="Подпишитесь на рассылку лучших публикаций" />
        </Typography>
        {this.props.isSubmitted ? (
          this.renderSuccessMessage()
        ) : (
          <Formik
            validationSchema={validationSchema}
            initialValues={{ email: "" }}
            onSubmit={this.props.onSubmit}
            render={this.renderFormik}
          />
        )}
      </div>
    );
  }

  private renderSuccessMessage = () => (
    <>
      <Typography isItalics isInverse variant="small">
        <T message="Спасибо! Ваш адрес добавлен в рассылку!" />
        <Button
          variant="link-underline"
          typographyProps={{ variant: "small", isItalics: true }}
          isInverse
          isInline
          onClick={this.props.onReset}>
          <T message="Хочу добавить еще один!" />
        </Button>
      </Typography>
    </>
  );

  private renderFormik = ({
    isSubmitting,
  }: FormikProps<FooterSubscribeFormValues>) => (
    <Form>
      {/* TODO intl */}
      <Input
        type="email"
        name="email"
        isInverse
        placeholder="Ваш e-mail"
        append={
          <Button isLoading={isSubmitting} variant="button-regular" isInverse>
            <Icon isInverse src={submit} />
          </Button>
        }
      />
    </Form>
  );
}

export default FooterSubscribeForm;
