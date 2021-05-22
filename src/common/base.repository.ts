import { NotFoundException } from '@nestjs/common';

import { isObjectMatch } from './helpers/is-object.match';

export class BaseRepository<T extends { id: string }> {
  records: T[] = [];

  protected serialize(record: T): T {
    return record;
  }

  private multiSerialize(records: T[]): Array<T> {
    return records.map(this.serialize);
  }

  create(inputRecord: T): T {
    this.records.push(inputRecord);
    return inputRecord;
  }

  find(param: Partial<T> = {}): Array<T> {
    return this.multiSerialize(
      this.records.filter((record) => isObjectMatch(record, param))
    );
  }

  findOne(id: string): T {
    const record = this.records.find(({ id: _id }) => _id === id);
    if (!record) {
      throw new NotFoundException();
    }

    return this.serialize(record);
  }

  update(id: string, input: Partial<T>): T {
    const index = this.records.findIndex(({ id: _id }) => _id === id);
    if (index < 0) {
      throw new NotFoundException();
    }

    this.records = [
      ...this.records.slice(0, index),
      {
        ...this.records[index],
        ...input,
      },
      ...this.records.slice(index + 1),
    ];

    return this.serialize(this.records[index]);
  }

  remove(id: string) {
    const index = this.records.findIndex(({ id: _id }) => _id === id);
    if (index < 0) {
      throw new NotFoundException();
    }

    this.records = [
      ...this.records.slice(0, index),
      ...this.records.slice(index + 1),
    ];
  }
}
