export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TGenariErrorRequest = {
  statusCode: number;
  message: string;
  errorSource: TErrorSource;
};
