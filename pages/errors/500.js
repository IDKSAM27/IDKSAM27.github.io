import ErrorLayout from '../../components/errors/ErrorLayout';

export default function Custom500() {
  return <ErrorLayout statusCode={500} />;
}
