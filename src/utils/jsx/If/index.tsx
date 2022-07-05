import { IfChildren, IfProps } from './interface';

const If = ({ isTrue, children }: IfProps): IfChildren => (isTrue ? children : null);

export default If;
