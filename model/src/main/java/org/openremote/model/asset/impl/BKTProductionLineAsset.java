/*
 * Copyright 2024, BKT Tyres
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.openremote.model.asset.impl;

import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;
import org.openremote.model.attribute.MetaItem;
import org.openremote.model.value.AttributeDescriptor;
import org.openremote.model.value.MetaItemType;
import org.openremote.model.value.ValueConstraint;
import org.openremote.model.value.ValueType;

import jakarta.persistence.Entity;
import java.util.Optional;

import static org.openremote.model.Constants.*;

/**
 * BKT Production Line asset representing manufacturing production lines
 */
@Entity
public class BKTProductionLineAsset extends Asset<BKTProductionLineAsset> {

    public static final AttributeDescriptor<Boolean> STATUS = new AttributeDescriptor<>("status", ValueType.BOOLEAN,
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AttributeDescriptor<Integer> PRODUCTION_COUNT = new AttributeDescriptor<>("productionCount", ValueType.POSITIVE_INTEGER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AttributeDescriptor<Double> EFFICIENCY = new AttributeDescriptor<>("efficiency", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_PERCENTAGE).withConstraints(new ValueConstraint.Min(0), new ValueConstraint.Max(100));

    public static final AttributeDescriptor<String> CURRENT_PRODUCT = new AttributeDescriptor<>("currentProduct", ValueType.TEXT,
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AssetDescriptor<BKTProductionLineAsset> DESCRIPTOR = new AssetDescriptor<>("img:production-line-bkt", "2196F3", BKTProductionLineAsset.class);

    /**
     * For use by hydrators (i.e. JPA/Jackson)
     */
    protected BKTProductionLineAsset() {
    }

    public BKTProductionLineAsset(String name) {
        super(name);
    }

    public Optional<Boolean> getStatus() {
        return getAttributes().getValue(STATUS);
    }

    public Optional<Integer> getProductionCount() {
        return getAttributes().getValue(PRODUCTION_COUNT);
    }

    public Optional<Double> getEfficiency() {
        return getAttributes().getValue(EFFICIENCY);
    }

    public Optional<String> getCurrentProduct() {
        return getAttributes().getValue(CURRENT_PRODUCT);
    }
}
