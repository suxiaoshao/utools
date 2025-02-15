import { RequestXForm, type XFormProps } from './requestXForm';
import { RequestUploadFile, type UploadFileProps } from './requestUploadFile';
import { Header, type HeaderProps, OtherHeader } from './header';
import { RequestEntity } from '@http/database/entity/request.entity';
import { sqlStore } from '@http/store/sqlStore';
import { match, P } from 'ts-pattern';

export type RequestBodyChoose = 'none' | 'text' | 'form-data' | 'x-www-form-urlencoded';
export type RequestTextChoose = 'json' | 'html' | 'xml' | 'javascript' | 'plaintext';

export type HeaderObject = Record<string, string>;

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 的 request 部分
 * */
export class HttpRequest {
  /**
   * body 选择
   * */
  bodyChoose: RequestBodyChoose;
  /**
   * body 为 text 时,text 类型选择
   * */
  textChoose: RequestTextChoose;
  text: string;
  dataForms: RequestUploadFile[];
  xForms: RequestXForm[];
  headers: Header[];
  requestId: number | null;

  constructor(
    requestId: number | null,
    bodyChoose: RequestBodyChoose,
    textChoose: RequestTextChoose,
    text: string,
    dataForms: RequestUploadFile[],
    xForms: RequestXForm[],
    headers: Header[],
  ) {
    this.requestId = requestId;
    this.bodyChoose = bodyChoose;
    this.textChoose = textChoose;
    this.text = text;
    this.dataForms = dataForms;
    this.xForms = xForms;
    this.headers = headers;
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 获取一个新的 http request
   * */
  static getNewRequestContent(): HttpRequest {
    return new HttpRequest(
      null,
      'none',
      'plaintext',
      '',
      [],
      [],
      [
        new Header(
          'User-Agent',
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45',
        ),
        new Header('Accept', '*/*'),
        new Header('Accept-Encoding', 'gzip, deflate, br'),
        new Header('Connection', 'keep-alive'),
      ],
    );
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 获取从其他值中获取的 header
   * */
  private getOtherContentType(): OtherHeader | undefined {
    const contentTypeHeader = new OtherHeader(
      'Content-Type',
      '',
      this.headers.some((value) => value.key === 'Content-Type' || value.key === 'content-type'),
    );

    contentTypeHeader.value = match<[RequestBodyChoose, RequestTextChoose]>([this.bodyChoose, this.textChoose])
      .with(['text', 'xml'], () => 'text/xml; charset=utf-8')
      .with(['text', 'html'], () => 'text/html; charset=utf-8')
      .with(['text', 'plaintext'], () => 'text/plain; charset=utf-8')
      .with(['text', 'javascript'], () => 'text/javascript; charset=utf-8')
      .with(['text', 'json'], () => 'application/json; charset=utf-8')
      .with(['x-www-form-urlencoded', 'plaintext'], () => 'application/x-www-form-urlencoded')
      .with(['form-data', 'plaintext'], () => 'multipart/form-data; boundary=<calculated when response is sent>')
      .otherwise(() => '');
    if (contentTypeHeader.value !== '') {
      return contentTypeHeader;
    }
    return undefined;
  }

  public getOtherHeaders(url: string): OtherHeader[] {
    const otherHeaders: OtherHeader[] = [];
    const contentTypeHeader = this.getOtherContentType();
    if (contentTypeHeader !== undefined) {
      otherHeaders.push(contentTypeHeader);
    }
    const cookieString = sqlStore.getCookieByUrl(url);
    if (cookieString !== '') {
      otherHeaders.push(
        new OtherHeader(
          'cookie',
          cookieString,
          this.headers.some((value) => value.key === 'cookie' || value.key === 'Cookie'),
        ),
      );
    }
    return otherHeaders;
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 根据 bodyChoose,textChoose 获取 http body 部分数据
   * */
  public getData(): undefined | URLSearchParams | string | FormData {
    return match([this.bodyChoose, this.textChoose])
      .with(['none', P.any], () => undefined)
      .with(['form-data', P.any], () => {
        const formData = new FormData();
        for (const value of this.dataForms) {
          const data = value.getData();
          if (value.isFile && data instanceof File) {
            formData.append(value.key, data, value.getFileName());
          } else {
            formData.append(value.key, data);
          }
        }
        return formData;
      })
      .with(['x-www-form-urlencoded', P.any], () => {
        const params = new URLSearchParams();
        for (const value of this.xForms) {
          params.append(value.key, value.value);
        }
        return params;
      })
      .with(['text', 'json'], () => JSON.parse(this.text))
      .with(['text', P.any], () => this.text)
      .otherwise(() => undefined);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 获取 http 数据和 header
   * */
  public getHeaderAndData(url: string): {
    headers: HeaderObject;
    data: undefined | URLSearchParams | string | FormData;
  } {
    const data = this.getData();
    const headerObject: HeaderObject = {};
    this.getOtherHeaders(url).forEach((value) => {
      if (!value.isDelete) {
        headerObject[value.key] = value.value;
      }
    });
    this.headers.forEach((value) => {
      headerObject[value.key] = value.value;
    });
    return {
      headers: headerObject,
      data: data,
    };
  }

  public getRequestEntity(): RequestEntity {
    return new RequestEntity(
      this.requestId,
      this.bodyChoose,
      this.textChoose,
      this.text,
      JSON.stringify(this.dataForms),
      JSON.stringify(this.xForms),
      JSON.stringify(this.headers),
    );
  }

  public changeFormRequestEntity(requestEntity: RequestEntity): void {
    this.requestId = requestEntity.requestId;
    this.bodyChoose = requestEntity.bodyChoose ?? this.bodyChoose;
    this.textChoose = requestEntity.textChoose ?? this.textChoose;
    this.text = requestEntity.text ?? this.text;
    this.dataForms = (JSON.parse(requestEntity.dataForms ?? JSON.stringify(this.dataForms)) as UploadFileProps[]).map(
      (value) => RequestUploadFile.formUploadFileProps(value),
    );
    this.xForms = (JSON.parse(requestEntity.xForms ?? JSON.stringify(this.xForms)) as XFormProps[]).map((value) =>
      RequestXForm.formXFormProps(value),
    );
    this.headers = (JSON.parse(requestEntity.headers ?? JSON.stringify(this.headers)) as HeaderProps[]).map((value) =>
      Header.formHeaderProp(value),
    );
  }
}
