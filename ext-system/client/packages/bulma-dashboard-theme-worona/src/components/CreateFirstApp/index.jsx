import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import Hero from '../../elements/Hero';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import { createSiteRequested, createSiteStatus, createSiteError, isCreatingSite }
  from '../../dependencies';
import { validate } from './validate';
import styles from './style.css';

const submit = (values, dispatch) => {
  dispatch(createSiteRequested(values.title, values.url));
};

const CreateFirstApp = ({ fields: { title, url }, handleSubmit, waiting, statusMessage,
  errorMessage }) => (
  <div>
    <Hero title="Now, create your first app" color="info"
      subtitle="Just enter the title and your WordPress url and we will do the rest."
    />

    <section className="hero-content">
      <div className="container is-text-centered">

        <form onSubmit={handleSubmit(submit)} className={styles.box}>
          <Input type="text" placeholder="App Title" icon="info-circle" {...title}
            help={cn(title.touched && title.error)}
            color={cn(title.touched && title.error && 'danger')}
          />
          <Input type="url" placeholder="Your WordPress URL" icon="wordpress" {...url}
            help={cn(url.touched && url.error)}
            color={cn(url.touched && url.error && 'danger')}
          />

          <Button color="success" center size="medium" loading={waiting} disabled={waiting}
            className={styles.button}
          >
            Create the app
          </Button>

          <div className={cn('help', styles.status)}>
            {statusMessage}
          </div>

          <div className={cn('help', 'is-danger', styles.status)}>
            {errorMessage.reason}
          </div>
        </form>

        <div className={styles.link}>
          <Link to="/">
              I'll do it later
          </Link>
        </div>

      </div>
    </section>
  </div>
);

CreateFirstApp.propTypes = {
  fields: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  failed: React.PropTypes.bool,
  statusMessage: React.PropTypes.any,
  errorMessage: React.PropTypes.any,
};

const mapStateToProps = state => ({
  waiting: isCreatingSite(state),
  statusMessage: createSiteStatus(state),
  errorMessage: createSiteError(state),
});

export default reduxForm({
  form: 'createFirstApp',
  fields: ['title', 'url'],
  validate,
}, mapStateToProps)(CreateFirstApp);
