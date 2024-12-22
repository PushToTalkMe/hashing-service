import { Model, Column, Table, DataType } from "sequelize-typescript";

@Table({
  tableName: "audit_logs",
  timestamps: true,
})
export class AuditLog extends Model {
  @Column({ type: DataType.INTEGER, allowNull: true })
  userId!: number | null;

  @Column(DataType.STRING)
  action!: string;

  @Column(DataType.STRING)
  status!: string;

  @Column({ type: DataType.JSONB, allowNull: true })
  additionalData!: string | null;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  timestamp!: Date;
}
