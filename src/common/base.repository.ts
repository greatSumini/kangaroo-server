import { NotFoundException } from '@nestjs/common';

export class BaseRepository<T extends { id: string }> {
  records: T[] = [];

  create(inputRecord: T): T {
    this.records.push(inputRecord);
    return inputRecord;
  }

  find(): T[] {
    return this.records;
  }

  findOne(id: string): T {
    const record = this.records.find(({ id: _id }) => _id === id);
    if (!record) {
      throw new NotFoundException();
    }

    return record;
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

    return this.records[index];
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
