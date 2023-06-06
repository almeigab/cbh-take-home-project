# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
If the arg `event` is falsy, the variable candidate will be empty, so we can assume that the result will be the TRIVIAL_PARTITION_KEY, since it's length is less then 256. That's why We can also remove the `if (candidate)` clause.

Since `Hash.digest` always returns a `string`, we can avoid testing the `candidate` type, when there is no `partitionKey` prop in `event`.

I've used a ternary operator to evaluate if `event.partitionKey` is a `string` to avoid nested ifs.

The function `hashString` was created to avoid re-writing the hashing code.

All tests passed both the refactored and original versions.