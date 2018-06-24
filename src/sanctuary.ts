import { compose, concat, equals, type } from 'ramda';
import { create, env } from 'sanctuary';
import $ from 'sanctuary-def';

const withNs = concat('shape-shift/');

// PromiseType :: Type
const PromiseType = $.NullaryType(withNs('Promise'))('Promise')(
  compose(
    equals('Promise'),
    type,
  ),
);

const S = create({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: env.concat([PromiseType]),
});

export default S;
