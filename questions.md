## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

The component and the PureComponent re-render when we pass a state or prop, but the component will render even if some of the props or state are the same.

PureComponent will render only when detects differences between props and state.

When we have a complex data structure it can reproduce and issue with PureComponent because it check the next and current props superficial and the same with states and it may produce false answers.

An example:

```
import React, { PureComponent, Component } from "react";

class Post extends PureComponent {
  render() {
    const { post } = this.props;
    return <h2>{post.title}</h2>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: { title: "Lorem Ipsum" },
    };
  }

  changeData = () => {
    const { post } = this.state;
    post.title = "Lorem";
    this.setState({ post });
  };

  render() {
    const { post } = this.state;
    return (
      <div>
        <Post post={post} />
        <button onClick={this.changeData}>Change post title</button>
      </div>
    );
  }
}
```

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

They are dangerous because, we are conditionally re-rendering a part the app, and this block the context propagation and the state can be change but context won't be updated.

## 3. Describe 3 ways to pass information from a component to its PARENT.

- Passing with a callback function, it is defined in the parent as a prop to the child.
- We can use useRef hook, we pass a reference from the parent to the child.
- Using a global state management like context, redux or zustand.

## 4. Give 2 ways to prevent components from re-rendering.

- Using useMemo to memoize a value in a component to avoid the re-render.
- Using React.Memo to wrap our component and if the don't have any change in the props/state it doesn't re-rendering.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is an element of React to avoid using unnecessarily a div.
An example where might break my app is using individuals div or whatever HTML tags without wrappers:

```js
const WithOutFragment = () => {

  return (
    <h1>Hello</h1>
    <h1>World</h1>
  )
}
```

## 6. Give 3 examples of the HOC pattern.

- ErrorBoundary:

```js
const withErrorBoundary = (WrappedComponent) => {
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
      // Log error to error reporting service
      // Display fallback UI
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return <ErrorFallback />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return ErrorBoundary;
};
```

- Adding internationalization:

```js
const withInternationalization = (WrappedComponent) => {
  const InternationalizedComponent = (props) => {
    const { language } = props;
    const translatedText = getTranslationForLanguage(language);

    return <WrappedComponent {...props} translatedText={translatedText} />;
  };

  return InternationalizedComponent;
};
```

- With styling

```js
const withStyling = (WrappedComponent) => {
  const StyledComponent = (props) => {
    const { variant } = props;
    const className = `styled-component ${variant}`;

    return <WrappedComponent {...props} className={className} />;
  };

  return StyledComponent;
};
```

## 7. What's the difference in handling exceptions in promises, callbacks and async…await?

To handle exceptions, callback functions use throw new Error method, async/await try catch method and promises use catch method.

## 8. How many arguments does setState take and why is it async.

It takes two arguments. The first argument is the state as returned by the app constructor. The second argument is the callback function that is called when the state is updated.
And is async to ensure that the app state is updated.

## 9. List the steps needed to migrate a Class to Function Component.

- Set our class component declaration to a function declaration
- Convert state variables in useState hooks
- Convert lifecycle methods to useEffect hooks
- Replace this references
- Delete render method
- Render JSX
- Refactor

## 10. List a few ways styles can be used with components.

- Inline styling: apply inline styles directly to JSX elements using style attribute.
- CSS stylesheets: create separate CSS files and import them into React files.
- CSS modules: enables local scoping of CSS class names, importing stylesheets as objects and accessing them as properties.

## 11. How to render an HTML string coming from the server.

We need to use the dangerouslySetInnerHTML attribute. This attribute allows us to set the innerHTML as HTML from a string.

```js
const MyComponent = () => {
  const htmlString = `<h1>This is a title!</h1>`;
  return <div dangerouslySetInnerHTML={htmlString} />;
};
```
