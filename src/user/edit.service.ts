import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './interfaces/auth.interface';
import { EditingDTO } from './dto/editing.dto';

@Injectable()
export class EditService {
  constructor(@InjectModel('User') private readonly authModel: Model<Auth>) {}

  async editing(editingDTO: EditingDTO, id: string): Promise<void> {
    await this.authModel.updateOne({ id: id }, editingDTO);
  }
}
