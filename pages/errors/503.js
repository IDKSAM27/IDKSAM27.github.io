import ErrorLayout from '../../components/errors/ErrorLayout';

export default function Custom503() {
  return <ErrorLayout statusCode={503} />;
}
