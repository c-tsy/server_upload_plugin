
// export interface UploadConfig {
//     AK?: string,
//     SK?: string,
//     Bucket?: string,
//     Path: string,
//     Domain?: string,
// }
export class UploadConfig{
    AK: string = "";
    SK: string = "";
    Bucket: string = "";
    Path: string|Function = "./Upload/{MD5}.{EXT}";
}