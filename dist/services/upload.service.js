var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UploadModel from "../models/upload.model";
export const saveFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const newFile = new UploadModel({
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
    });
    yield newFile.save();
    return newFile;
});
export const fetchUploads = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield UploadModel.find();
});
//# sourceMappingURL=upload.service.js.map