# Testing

1. Get an overview of how I enabled testing for your project.
    - What is the `jest.config.js` for?
    - How is a test file structured?

2. What kind of tests were written? Hint: What do you think of the speed/time of execution? Slow? Fast?

2. Fix the tests and/or the code.

3. In order to test the `ArticleSubView#trimContentToLength` function, I applied some tricks.
    - What tricks? Why do you think I did it?
    - What would you do in order to increase the testability of `#trimContentToLength()` even further?
    - Retrospectively do you wish you would have had these tests before implementing the functionality?

4. Write tests for APIService on your own.

5. Read up on **TDD**: _Test Driven Development_. Think about the upcoming fulltext search.
    - https://martinfowler.com/articles/mocksArentStubs.html
    - What are the benefits and consequences of TDD? What are the downsides?
    - When implementing the fulltext search in APIService, start writing the tests **before** the implementation!!
    - bonus points for not using the `any type` in your tests as I did ;)

